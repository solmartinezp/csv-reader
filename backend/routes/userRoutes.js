"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("../db/dbConfig"));
const router = express_1.default.Router();
// Endpoint to search users
router.get('/api/users', (req, res) => {
    const searchTerm = req.query.q;

    dbConfig_1.default.all(`PRAGMA table_info(users)`, (err, columns) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving column information' });
        }
        const columnNames = columns.map(col => col.name).join(', ');
        let query = `SELECT ${columnNames} FROM users`;
        if (searchTerm) {

            query += ` WHERE ${columns.map(col => `${col.name} LIKE '%${searchTerm}%'`).join(' OR ')}`;
        }
        dbConfig_1.default.all(query, (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error retrieving users' });
            }
            res.json({ data: rows });
        });
    });
});
exports.default = router;
