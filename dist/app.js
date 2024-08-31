"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const loggingAndValidationMiddleware_1 = __importDefault(require("./middleware/loggingAndValidationMiddleware"));
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.routes();
    }
    routes() {
        this.server.use(express_1.default.json());
        this.server.use(loggingAndValidationMiddleware_1.default);
        this.server.use('/products', routes_1.default);
    }
}
exports.default = new App().server;
