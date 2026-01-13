import dotenv from "dotenv";
// Load environment variables FIRST before any other imports
dotenv.config();

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// Routes (imported AFTER dotenv.config)
import authRoutes from "./routes/auth";
import signRoutes from "./routes/signs";
import quizRoutes from "./routes/quiz";
import userRoutes from "./routes/user";
import aiRoutes from "./routes/ai";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Make prisma available in routes
app.set("prisma", prisma);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/signs", signRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal server error", message: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SignWise AI Backend running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});

export { prisma };
