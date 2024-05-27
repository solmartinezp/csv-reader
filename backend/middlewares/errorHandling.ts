import { Request, Response, NextFunction } from 'express';

// Middleware to handle errors
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
}

export default errorHandler;
