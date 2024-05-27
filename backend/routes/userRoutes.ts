import express, { Router, Request, Response } from 'express';
import db from '../db/dbConfig';

const router: Router = express.Router();

// Endpoint to search users
router.get('/api/users', (req: Request, res: Response) => {
    const searchTerm: string = req.query.q as string;

    db.all(`PRAGMA table_info(users)`, (err: Error, columns: any[]) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving column information' });
      }
  
      const columnNames: string = columns.map(col => col.name).join(', ');
  
      let query: string = `SELECT ${columnNames} FROM users`;
  
      if (searchTerm) {
        query += ` WHERE ${columns.map(col => `${col.name} LIKE '%${searchTerm}%'`).join(' OR ')}`;
      }
  
      db.all(query, (err: Error, rows: any[]) => {
        if (err) {
          return res.status(500).json({ message: 'Error retrieving users' });
        }
        res.json({ data: rows });
      });
    });
});

export default router;
