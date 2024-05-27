import express, { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import uploadCSV from '../controllers/fileUploadController';

const router: Router = express.Router();
const upload = multer();

// Define an async request handler function that wraps uploadCSV
const handleUploadCSV = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call uploadCSV and await its completion
    await uploadCSV(req, res);
  } catch (error) {
    // Pass any caught errors to the Express error handler
    next(error);
  }
};

router.post('/api/files', upload.single('file'), handleUploadCSV);

export default router;
