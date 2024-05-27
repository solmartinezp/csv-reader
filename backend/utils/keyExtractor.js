"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function getAllKeys(outputArray) {
    const keys = new Set();
    outputArray.forEach(obj => {
        Object.keys(obj).forEach(key => {
            keys.add(key);
        });
    });
    return Array.from(keys);
}
exports.default = getAllKeys;
