"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fileUploadController_1 = __importDefault(require("../controllers/fileUploadController"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
// Define an async request handler function that wraps uploadCSV
const handleUploadCSV = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call uploadCSV and await its completion
        yield (0, fileUploadController_1.default)(req, res);
    }
    catch (error) {
        // Pass any caught errors to the Express error handler
        next(error);
    }
});
router.post('/api/files', upload.single('file'), handleUploadCSV);
exports.default = router;
