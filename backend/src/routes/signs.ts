import { Router } from 'express';
import prisma from '../db';

const router = Router();

// Get all signs with optional filtering
router.get('/', async (req, res) => {
    const { category, search, limit = '50' } = req.query;

    const where: any = {};

    if (category && category !== 'all') {
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

    // Get unique categories
    const allCategories = await prisma.sign.groupBy({
        by: ['category'],
    });

    res.json({
        success: true,
        signs,
        total: signs.length,
        categories: ['all', ...allCategories.map(c => c.category)],
    });
});

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
