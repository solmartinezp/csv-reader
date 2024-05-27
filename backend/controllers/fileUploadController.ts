import { Request, Response } from 'express';
import db from '../db/dbConfig';
import parseCSV from '../utils/csvParser';
import transformObject from '../utils/objectTransformer';
import getAllKeys from '../utils/keyExtractor';

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

// Endpoint to upload CSV file
function uploadCSV(req: Request, res: Response<any, Record<string, any>>): Response<any, Record<string, any>> {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const csv: string = req.file.buffer.toString('utf8');

  // Parse CSV string into an array of objects
  const data: any[] = parseCSV(csv);

  const outputArray: any[] = data.map(transformObject);

  // Get all unique keys from the array of objects
  const keys: string[] = getAllKeys(outputArray);

  // Create table dynamically based on object keys
  db.serialize(() => {
    const createTableSQL: string = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ${keys.map(key => `${key} TEXT`).join(', ')}
      )
    `;
    db.run(createTableSQL, function(err) {
      if (err) {
        console.error(`Error creating table: ${err.message}`);
        return res.status(500).json({ message: 'Error creating table' });
      }
      console.log('Table created successfully');

      // Insert data into the database
      const insertStmt = db.prepare(`
        INSERT INTO users (${keys.join(', ')})
        VALUES (${keys.map(() => '?').join(', ')})
      `);

      outputArray.forEach(obj => {
        const values = keys.map(key => obj[key] || null);
        insertStmt.run(values, function(err) {
          if (err) {
            console.error(`Error inserting row: ${err.message}`);
            return res.status(500).json({ message: 'Error inserting row' });
          }
          console.log(`Row inserted with ID: ${this.lastID}`);
        });
      });

      insertStmt.finalize(err => {
        if (err) {
          console.error(`Error finalizing statement: ${err.message}`);
          return res.status(500).json({ message: 'Error finalizing statement' });
        }
        console.log('All rows inserted successfully');
        return res.json({ message: 'The file was uploaded successfully.' , data: outputArray });
      });
    });
  });

  return res;
}

export default uploadCSV;
