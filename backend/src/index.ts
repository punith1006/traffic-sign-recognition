import 'dotenv/config';
import app from './app';
import prisma from './db';

const PORT = process.env.PORT || 3001;

async function main() {
    try {
        // Test database connection
        await prisma.$connect();
        console.log('✅ Database connected');

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 SignWise Backend running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

main();

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
