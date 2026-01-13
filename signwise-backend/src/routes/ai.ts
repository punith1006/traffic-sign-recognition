import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth";

const router = Router();
const getPrisma = (req: Request): PrismaClient => req.app.get("prisma");

// Initialize Gemini for chat only
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Python YOLO service URL
const YOLO_SERVICE_URL = process.env.YOLO_SERVICE_URL || "http://localhost:8000";

// Type for YOLO service response
interface YoloResult {
    success: boolean;
    sign_name?: string;
    category?: string;
    description?: string;
    rules?: string;
    confidence?: number;
    annotated_image?: string; // Base64 encoded JPEG from Python service
    is_mock?: boolean;
    error?: string;
}

// Sign Recognition endpoint - Uses YOLO
router.post("/recognize", optionalAuthMiddleware, async (req: Request, res: Response) => {
    const prisma = getPrisma(req);

    try {
        const { imageBase64 } = req.body;

        if (!imageBase64) {
            return res.status(400).json({ error: "Image data required" });
        }

        // Call Python YOLO service
        let yoloResult: YoloResult | null = null;
        try {
            const response = await fetch(`${YOLO_SERVICE_URL}/recognize`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image_base64: imageBase64 }),
            });

            if (!response.ok) {
                throw new Error(`YOLO service returned ${response.status}`);
            }

            yoloResult = await response.json() as YoloResult;
        } catch (fetchError) {
            console.error("YOLO service error:", fetchError);
            // Fallback to mock if YOLO service unavailable
            return handleMockRecognition(req, res, prisma);
        }

        if (!yoloResult || !yoloResult.success) {
            return handleMockRecognition(req, res, prisma);
        }

        // Try to match with database sign
        let dbSign = await prisma.sign.findFirst({
            where: {
                OR: [
                    { name: { contains: yoloResult.sign_name?.split(" ")[0] || "" } },
                    { name: { contains: yoloResult.sign_name || "" } },
                ],
            },
        });

        // Build sign result
        const signResult = dbSign || {
            id: "yolo-" + Date.now(),
            name: yoloResult.sign_name,
            category: yoloResult.category,
            description: yoloResult.description,
            rules: yoloResult.rules,
            imageUrl: "",
            region: "US",
        };

        // Award XP if user is logged in
        const userId = (req as any).userId;
        if (userId) {
            await prisma.user.update({
                where: { id: userId },
                data: { xp: { increment: 10 } },
            });
        }

        res.json({
            success: true,
            sign: signResult,
            confidence: yoloResult.confidence,
            xpEarned: userId ? 10 : 0,
            annotatedImage: yoloResult.annotated_image, // Pass through annotated image
            isMock: yoloResult.is_mock || false,
            model: "YOLO",
        });
    } catch (error) {
        console.error("Recognition error:", error);
        return handleMockRecognition(req, res, prisma);
    }
});

// Helper function for mock recognition fallback
async function handleMockRecognition(req: Request, res: Response, prisma: PrismaClient) {
    try {
        const signs = await prisma.sign.findMany({ take: 10 });
        const randomSign = signs[Math.floor(Math.random() * signs.length)];

        if (randomSign) {
            const userId = (req as any).userId;
            if (userId) {
                await prisma.user.update({
                    where: { id: userId },
                    data: { xp: { increment: 10 } },
                });
            }

            return res.json({
                success: true,
                sign: randomSign,
                confidence: 0.85 + Math.random() * 0.14,
                xpEarned: userId ? 10 : 0,
                isMock: true,
                message: "Using mock response (YOLO service unavailable)",
            });
        }
    } catch (fallbackError) {
        console.error("Fallback error:", fallbackError);
    }

    res.status(500).json({ error: "Failed to recognize sign" });
}

// AI Chat endpoint
router.post("/chat", optionalAuthMiddleware, async (req: Request, res: Response) => {
    const prisma = getPrisma(req);
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message required" });
    }

    try {

        // Get some signs for context
        const signs = await prisma.sign.findMany({ take: 20 });
        const signContext = signs.map(s => `${s.name} (${s.category}): ${s.description}`).join("\n");

        // If no API key, return mock response
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your-gemini-api-key-here") {
            const mockResponses: Record<string, string> = {
                stop: "**Stop Sign** 🛑\n- Requires COMPLETE stop\n- Check all directions\n- Proceed when safe",
                yield: "**Yield Sign** ⚠️\n- Slow down\n- Give right-of-way\n- Stop only if needed",
                warning: "Warning signs are **yellow diamonds**:\n- 🦌 Animal crossings\n- ⚠️ Curves\n- 🚧 Construction",
                railroad: "At railroad crossings:\n1. Slow down\n2. Look both ways\n3. Never stop on tracks",
                default: "Traffic signs are categorized by shape and color:\n- **Red** = Stop/prohibition\n- **Yellow** = Warning\n- **Green** = Information\n- **Blue** = Services",
            };

            const lowerMessage = message.toLowerCase();
            let reply = mockResponses.default;
            let signRef = null;

            for (const [key, value] of Object.entries(mockResponses)) {
                if (lowerMessage.includes(key)) {
                    reply = value;
                    signRef = signs.find(s => s.name.toLowerCase().includes(key));
                    break;
                }
            }

            return res.json({ reply, signRef, isMock: true });
        }

        // Use Gemini for real chat
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const systemPrompt = `You are SignWise AI, a friendly and knowledgeable traffic sign tutor. Your job is to help users learn about traffic signs and road safety.

Available traffic signs in the database:
${signContext}

Guidelines:
1. Be helpful, concise, and educational
2. Use markdown formatting for clarity (bold, lists, emojis)
3. When relevant, reference specific signs from the database
4. Focus on safety and practical driving advice
5. Keep responses under 200 words
6. If asked about something unrelated to traffic/driving, politely redirect to traffic safety topics`;

        const chatHistory = [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: "I understand. I'm SignWise AI, ready to help with traffic sign questions!" }] },
            ...conversationHistory.map((msg: { role: string; content: string }) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }],
            })),
        ];

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(message);
        const reply = result.response.text();

        // Try to find a relevant sign to reference
        let signRef = null;
        const lowerReply = reply.toLowerCase();
        for (const sign of signs) {
            if (lowerReply.includes(sign.name.toLowerCase())) {
                signRef = sign;
                break;
            }
        }

        res.json({ reply, signRef, isMock: false });
    } catch (error) {
        console.error("Chat error:", error);

        // Fallback to mock response when API fails
        const mockResponses: Record<string, string> = {
            stop: "**Stop Sign** 🛑\n- Requires COMPLETE stop\n- Check all directions\n- Proceed when safe",
            yield: "**Yield Sign** ⚠️\n- Slow down\n- Give right-of-way\n- Stop only if needed",
            warning: "Warning signs are **yellow diamonds**:\n- 🦌 Animal crossings\n- ⚠️ Curves\n- 🚧 Construction",
            railroad: "At railroad crossings:\n1. Slow down\n2. Look both ways\n3. Never stop on tracks",
            default: "Traffic signs are categorized by shape and color:\n- **Red** = Stop/prohibition\n- **Yellow** = Warning\n- **Green** = Information\n- **Blue** = Services\n\n_(AI quota exceeded - using cached response)_",
        };

        const lowerMessage = message.toLowerCase();
        let reply = mockResponses.default;

        for (const [key, value] of Object.entries(mockResponses)) {
            if (lowerMessage.includes(key)) {
                reply = value;
                break;
            }
        }

        res.json({ reply, signRef: null, isMock: true });
    }
});

export default router;
