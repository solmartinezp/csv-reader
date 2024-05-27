"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
const csvParser_1 = __importDefault(require("../utils/csvParser"));
const objectTransformer_1 = __importDefault(require("../utils/objectTransformer"));
const keyExtractor_1 = __importDefault(require("../utils/keyExtractor"));
// Endpoint to upload CSV file
function uploadCSV(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const csv = req.file.buffer.toString('utf8');
    // Parse CSV string into an array of objects
    const data = (0, csvParser_1.default)(csv);
    // Transform objects to match database schema
    const outputArray = data.map(objectTransformer_1.default);
    // Get all unique keys from the array of objects
    const keys = (0, keyExtractor_1.default)(outputArray);
    // Create table dynamically based on object keys
    dbConfig_1.default.serialize(() => {
        const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ${keys.map(key => `${key} TEXT`).join(', ')}
      )
    `;
        dbConfig_1.default.run(createTableSQL, function (err) {
            if (err) {
                console.error(`Error creating table: ${err.message}`);
                return res.status(500).json({ message: 'Error creating table' });
            }
            console.log('Table created successfully');
            // Insert data into the database
            const insertStmt = dbConfig_1.default.prepare(`
        INSERT INTO users (${keys.join(', ')})
        VALUES (${keys.map(() => '?').join(', ')})
      `);
            outputArray.forEach(obj => {
                const values = keys.map(key => obj[key] || null);
                insertStmt.run(values, function (err) {
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
                return res.json({ message: 'The file was uploaded successfully.', data: outputArray });
            });
        });
    });
    return res;
}
exports.default = uploadCSV;
