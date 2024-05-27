import request from 'supertest';
import express from 'express';
import multer from 'multer';
import uploadCSV from '../controllers/fileUploadController';
import db from '../db/dbConfig';

const app = express();
const upload = multer();

app.post('/api/files', upload.single('file'), async (req, res, next) => {
  try {
    await uploadCSV(req, res);
  } catch (error) {
    next(error);
  }
});

describe('POST /api/files', () => {
  beforeAll((done) => {
    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)', done);
    });
  });

  afterAll((done) => {
    db.serialize(() => {
      db.run('DROP TABLE IF EXISTS users', done);
    });
  });

  it('should upload a CSV file and store data in the database', async () => {
    const csvContent = 'name,email\nJohn Doe,johndoe@example.com';

    const response = await request(app)
      .post('/api/files')
      .attach('file', Buffer.from(csvContent), 'test.csv');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('The file was uploaded successfully.');
  });

  it('should return 400 if no file is uploaded', async () => {
    const response = await request(app).post('/api/files');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('No file uploaded');
  });
});
