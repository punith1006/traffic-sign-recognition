import { Router } from 'express';
import prisma from '../db';

const router = Router();

// Get all signs with optional filtering
router.get('/', async (req, res) => {
    const { category, search, limit = '50', visitorId } = req.query;

    const where: any = {};

    // Special handling for 'discovered' category - show signs this user has recognized
    if (category === 'discovered' && visitorId) {
        const recognitions = await prisma.recognition.findMany({
            where: { visitorId: visitorId as string },
            select: { signId: true },
            distinct: ['signId'],
        });
        const signIds = recognitions.map(r => r.signId).filter(Boolean) as string[];

        if (signIds.length === 0) {
            return res.json({
                success: true,
                signs: [],
                total: 0,
                categories: await getCategories(),
            });
        }
        where.id = { in: signIds };
    } else if (category && category !== 'all') {
        where.category = category as string;
    }

    if (search) {
        where.name = { contains: search as string };
    }

    const signs = await prisma.sign.findMany({
        where,
        take: parseInt(limit as string),
        orderBy: { name: 'asc' },
    });

    res.json({
        success: true,
        signs,
        total: signs.length,
        categories: await getCategories(),
    });
});

// Helper to get categories including 'discovered'
async function getCategories() {
    const allCategories = await prisma.sign.groupBy({
        by: ['category'],
    });
    return ['all', 'discovered', ...allCategories.map(c => c.category)];
}

// Get single sign by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const sign = await prisma.sign.findUnique({
        where: { id },
    });

    if (!sign) {
        return res.status(404).json({
            success: false,
            message: 'Sign not found',
        });
    }

    // Get related signs (same category)
    const relatedSigns = await prisma.sign.findMany({
        where: {
            category: sign.category,
            id: { not: sign.id },
        },
        take: 4,
    });

    res.json({
        success: true,
        sign,
        relatedSigns,
    });
});

export default router;
