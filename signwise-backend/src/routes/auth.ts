import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Helper to get prisma from app
const getPrisma = (req: Request): PrismaClient => req.app.get("prisma");

// Generate JWT token
const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
};

// Guest login - creates a guest user
router.post("/guest", async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const guestUsername = `Guest_${uuidv4().slice(0, 8)}`;

        const user = await prisma.user.create({
            data: {
                username: guestUsername,
                isGuest: true,
            },
        });

        const token = generateToken(user.id);

        res.json({
            user: {
                id: user.id,
                username: user.username,
                isGuest: user.isGuest,
                xp: user.xp,
                level: user.level,
                streakDays: user.streakDays,
            },
            token,
        });
    } catch (error) {
        console.error("Guest login error:", error);
        res.status(500).json({ error: "Failed to create guest user" });
    }
});

// Register new user
router.post("/register", async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const { email, username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password required" });
        }

        const existing = await prisma.user.findFirst({
            where: { OR: [{ username }, { email: email || undefined }] },
        });

        if (existing) {
            return res.status(400).json({ error: "Username or email already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, username, passwordHash, isGuest: false },
        });

        const token = generateToken(user.id);

        res.json({
            user: { id: user.id, username: user.username, email: user.email, xp: user.xp, level: user.level, streakDays: user.streakDays },
            token,
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const prisma = getPrisma(req);
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user || !user.passwordHash) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Update streak
        const now = new Date();
        const lastActive = new Date(user.lastActiveAt);
        const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

        let streakDays = user.streakDays;
        if (daysDiff === 1) {
            streakDays += 1;
        } else if (daysDiff > 1) {
            streakDays = 1;
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { lastActiveAt: now, streakDays },
        });

        const token = generateToken(user.id);

        res.json({
            user: { id: user.id, username: user.username, email: user.email, xp: user.xp, level: user.level, streakDays },
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" });
    }
});

export default router;
