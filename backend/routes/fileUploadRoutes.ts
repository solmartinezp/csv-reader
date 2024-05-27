import express, { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import uploadCSV from '../controllers/fileUploadController';

const router: Router = express.Router();
const upload = multer();

const handleUploadCSV = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await uploadCSV(req, res);
  } catch (error) {
    next(error);
  }
};

router.post('/api/files', upload.single('file'), handleUploadCSV);

export default router;
