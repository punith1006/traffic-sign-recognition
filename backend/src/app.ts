import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import recognizeRouter from './routes/recognize';
import signsRouter from './routes/signs';
import quizRouter from './routes/quiz';
import progressRouter from './routes/progress';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:3003',
        'http://localhost:3004',
        'http://127.0.0.1:3004',
    ],
    credentials: true,
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'SignWise Backend API' });
});

// API Routes
app.use('/api/recognize', recognizeRouter);
app.use('/api/signs', signsRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/progress', progressRouter);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        service: 'SignWise AI Backend',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            recognize: '/api/recognize',
            signs: '/api/signs',
            quiz: '/api/quiz',
            progress: '/api/progress',
        },
    });
});

// Error handling
app.use(errorHandler);

export default app;
