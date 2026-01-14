import multer from 'multer';

// Store files in memory (not on disk)
const storage = multer.memoryStorage();

// File filter for images only
const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

// Configure multer
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max
    },
});

export default upload;
