"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = require("./app/Routes");
const notRoute_1 = require("./app/middleware/notRoute");
const GlobalErrorHandler_1 = require("./app/middleware/GlobalErrorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1', Routes_1.router);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(GlobalErrorHandler_1.globalErrorHandler);
app.use(notRoute_1.notFound);
exports.default = app;
