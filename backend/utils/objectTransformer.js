"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function transformObject(inputObject) {
    const keys = Object.keys(inputObject);
    const values = Object.values(inputObject)[0].split(';');
    return keys[0].split(';').reduce((result, key, index) => {
        result[key.trim().toLowerCase().replace(' ', '_')] = values[index];
        return result;
    }, {});
}
exports.default = transformObject;
