import request from 'supertest';
import express from 'express';
import userRouter from '../routes/userRoutes';
import db from '../db/dbConfig';

const app = express();
app.use(express.json());
app.use('/api/users', userRouter);

describe('GET /api/users', () => {
  beforeAll((done) => {
    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)', () => {
        db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['John Doe', 'johndoe@example.com'], done);
      });
    });
  });

  afterAll((done) => {
    db.serialize(() => {
      db.run('DROP TABLE IF EXISTS users', done);
    });
  });

  it('should retrieve all users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([{ id: 1, name: 'John Doe', email: 'johndoe@example.com' }]);
  });

  it('should search for users by query', async () => {
    const response = await request(app).get('/api/users').query({ q: 'John' });

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([{ id: 1, name: 'John Doe', email: 'johndoe@example.com' }]);
  });
});
