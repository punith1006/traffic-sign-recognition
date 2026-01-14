import { Router } from 'express';
import fetch from 'node-fetch';
import FormData from 'form-data';
import upload from '../middleware/upload';
import prisma from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const YOLO_SERVICE_URL = process.env.YOLO_SERVICE_URL || 'http://localhost:8000';
console.log(`📡 YOLO Service URL: ${YOLO_SERVICE_URL}`);

// Hamming distance threshold - matches fingerprint.py
const DUPLICATE_THRESHOLD = 5;

interface YoloPrediction {
    class_id: number;
    class_name: string;
    confidence: number;
    category: string;
    bbox?: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    };
}

interface YoloResponse {
    success: boolean;
    predictions: YoloPrediction[];
    inference_time_ms: number;
    image_phash?: string;  // Perceptual hash for duplicate detection
    message?: string;
}

/**
 * Compute Hamming distance between two hex hash strings.
 * Each hex char represents 4 bits, so we compare bit by bit.
 */
function hammingDistance(hash1: string, hash2: string): number {
    if (!hash1 || !hash2 || hash1.length !== hash2.length) {
        return 64; // Max distance for 64-bit hash
    }

    let distance = 0;
    for (let i = 0; i < hash1.length; i++) {
        const n1 = parseInt(hash1[i], 16);
        const n2 = parseInt(hash2[i], 16);
        // Count differing bits using XOR and popcount
        let xor = n1 ^ n2;
        while (xor) {
            distance += xor & 1;
            xor >>= 1;
        }
    }
    return distance;
}

/**
 * Check if a pHash is a duplicate of any existing hashes for this user.
 */
async function checkDuplicate(visitorId: string, newHash: string): Promise<{ isDuplicate: boolean; matchingHash?: string }> {
    if (!newHash) {
        return { isDuplicate: false };
    }

    // Get all existing hashes for this user
    const existingHashes = await prisma.imageHash.findMany({
        where: { visitorId },
        select: { phash: true }
    });

    // Check each hash for similarity
    for (const { phash } of existingHashes) {
        const distance = hammingDistance(newHash, phash);
        if (distance <= DUPLICATE_THRESHOLD) {
            console.log(`🔄 Duplicate detected! Hash: ${newHash}, Distance: ${distance}`);
            return { isDuplicate: true, matchingHash: phash };
        }
    }

    return { isDuplicate: false };
}

router.post('/', upload.single('image'), async (req, res) => {
    const visitorId = (req.headers['x-visitor-id'] as string) || uuidv4();

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'No image file provided',
        });
    }

    try {
        // Forward image to YOLO service
        const formData = new FormData();
        formData.append('image', req.file.buffer, {
            filename: req.file.originalname || 'image.jpg',
            contentType: req.file.mimetype,
        });

        const yoloResponse = await fetch(`${YOLO_SERVICE_URL}/predict`, {
            method: 'POST',
            body: formData,
            headers: formData.getHeaders(),
        });

        if (!yoloResponse.ok) {
            throw new Error(`YOLO service error: ${yoloResponse.status}`);
        }

        const yoloResult = (await yoloResponse.json()) as YoloResponse;

        // If no predictions, return early
        if (!yoloResult.predictions || yoloResult.predictions.length === 0) {
            return res.json({
                success: false,
                message: 'No traffic signs detected in the image. Try uploading a clearer image.',
                suggestions: [
                    'Make sure the traffic sign is clearly visible',
                    'Try a photo with better lighting',
                    'Ensure the sign is not too far away',
                ],
            });
        }

        // Get the top prediction
        const topPrediction = yoloResult.predictions[0];
        const imagePhash = yoloResult.image_phash;

        // Check for duplicate image BEFORE awarding XP
        const { isDuplicate } = await checkDuplicate(visitorId, imagePhash || '');

        // Try to find matching sign in database
        let sign = await prisma.sign.findFirst({
            where: {
                OR: [
                    { classId: topPrediction.class_id },
                    { name: { contains: topPrediction.class_name } },
                ],
            },
        });

        // If no match, create the sign entry in the database
        if (!sign) {
            sign = await prisma.sign.create({
                data: {
                    classId: topPrediction.class_id,
                    name: topPrediction.class_name,
                    category: topPrediction.category,
                    description: `This is a ${topPrediction.class_name} traffic sign.`,
                    rules: `Follow the ${topPrediction.class_name} sign guidelines when driving.`,
                    imageUrl: `/signs/default.png`,
                },
            });
            console.log(`📝 Created new sign: ${sign.name} (classId: ${sign.classId})`);
        }

        // Calculate XP earned (only if NOT a duplicate)
        const xpEarned = isDuplicate ? 0 : (topPrediction.confidence > 0.8 ? 15 : 10);

        // Update or create user progress (only increment if NOT duplicate)
        let userProgress = await prisma.userProgress.findUnique({
            where: { visitorId },
        });

        if (!userProgress) {
            userProgress = await prisma.userProgress.create({
                data: {
                    visitorId,
                    xp: xpEarned,
                    signsLearned: isDuplicate ? 0 : 1,
                    lastActiveAt: new Date(),
                },
            });
        } else if (!isDuplicate) {
            // Only update XP and signs if not a duplicate
            userProgress = await prisma.userProgress.update({
                where: { visitorId },
                data: {
                    xp: { increment: xpEarned },
                    signsLearned: { increment: 1 },
                    lastActiveAt: new Date(),
                },
            });
        }

        // Save recognition record (always, for history)
        await prisma.recognition.create({
            data: {
                visitorId,
                signId: sign.id,
                confidence: topPrediction.confidence,
            },
        });

        // Store image hash for future duplicate detection (only if new)
        if (!isDuplicate && imagePhash) {
            await prisma.imageHash.create({
                data: {
                    visitorId,
                    phash: imagePhash,
                    signClassId: topPrediction.class_id,
                },
            });
            console.log(`🆕 Stored new image hash: ${imagePhash}`);
        }

        // Calculate new level (100 XP per level)
        const newLevel = Math.floor(userProgress.xp / 100) + 1;
        if (newLevel > userProgress.level) {
            await prisma.userProgress.update({
                where: { visitorId },
                data: { level: newLevel },
            });
        }

        res.json({
            success: true,
            recognition: {
                sign: {
                    id: sign.id,
                    name: sign.name,
                    category: sign.category,
                    description: sign.description,
                    rules: sign.rules,
                    imageUrl: sign.imageUrl,
                },
                confidence: topPrediction.confidence,
                bbox: topPrediction.bbox,
                xpEarned,
                isDuplicate,  // Flag for frontend to show appropriate message
            },
            progress: {
                totalXp: userProgress.xp,
                level: newLevel,
            },
            inferenceTime: yoloResult.inference_time_ms,
        });
    } catch (error) {
        console.error('Recognition error:', error);

        // Check if YOLO service is unreachable
        if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
            return res.status(503).json({
                success: false,
                message: 'AI service is currently unavailable. Please try again later.',
            });
        }

        throw error;
    }
});

export default router;
