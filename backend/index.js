"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandling_1 = __importDefault(require("./middlewares/errorHandling"));
const corsMiddleware_1 = __importDefault(require("./middlewares/corsMiddleware"));
const fileUploadRoutes_1 = __importDefault(require("./routes/fileUploadRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
// CORS middleware
app.use(corsMiddleware_1.default);
// Middleware to handle errors
app.use(errorHandling_1.default);
// Routes
app.use(fileUploadRoutes_1.default);
app.use(userRoutes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
