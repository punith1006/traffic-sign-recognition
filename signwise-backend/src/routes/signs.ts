import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const getPrisma = (req: Request): PrismaClient => req.app.get("prisma");

// Get all signs with optional filtering
router.get("/", async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const { category, search, limit } = req.query;

        const where: any = {};
        if (category && category !== "ALL") {
            where.category = category;
        }
        if (search) {
            where.OR = [
                { name: { contains: search as string } },
                { description: { contains: search as string } },
            ];
        }

        const signs = await prisma.sign.findMany({
            where,
            take: limit ? parseInt(limit as string) : undefined,
            orderBy: { name: "asc" },
        });

        res.json(signs);
    } catch (error) {
        console.error("Get signs error:", error);
        res.status(500).json({ error: "Failed to fetch signs" });
    }
});

// Get sign by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const sign = await prisma.sign.findUnique({
            where: { id: req.params.id },
        });

        if (!sign) {
            return res.status(404).json({ error: "Sign not found" });
        }

        res.json(sign);
    } catch (error) {
        console.error("Get sign error:", error);
        res.status(500).json({ error: "Failed to fetch sign" });
    }
});

// Get sign categories with counts
router.get("/categories/stats", async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const categories = await prisma.sign.groupBy({
            by: ["category"],
            _count: { id: true },
        });

        res.json(categories.map(c => ({ category: c.category, count: c._count.id })));
    } catch (error) {
        console.error("Get categories error:", error);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

export default router;
