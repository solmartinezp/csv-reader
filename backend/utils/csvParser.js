"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function to parse CSV string
function parseCSV(csvString, hasHeaders = true) {
    const rows = csvString.trim().split(/\n|\r\n/); // Splitting by newline
    const parsedData = rows.map(row => row.split(/[,;]/).map(field => {
        const trimmedField = field.trim();
        // Convert to number if it's a numeric value
        return !isNaN(Number(trimmedField)) && trimmedField !== '' ? Number(trimmedField) : trimmedField;
    }));
    if (hasHeaders) {
        const headers = parsedData.shift();
        return parsedData.map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header] = row[index];
                return obj;
            }, {});
        });
    }
    else {
        return parsedData;
    }
}
exports.default = parseCSV;
