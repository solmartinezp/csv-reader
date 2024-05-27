import sqlite3 from 'sqlite3';

// Create an in-memory database
const db = new sqlite3.Database(':memory:');

export default db;