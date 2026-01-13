import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { userId: string };

        req.userId = decoded.userId;
        (req as any).userId = decoded.userId;

        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

// Optional auth - doesn't fail if no token, but attaches userId if valid
export const optionalAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { userId: string };
            req.userId = decoded.userId;
            (req as any).userId = decoded.userId;
        }

        next();
    } catch (error) {
        // Ignore invalid tokens, just proceed without userId
        next();
    }
};
