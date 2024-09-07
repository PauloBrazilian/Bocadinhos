"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PersonRoute_1 = __importDefault(require("./routes/PersonRoute"));
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.routes();
    }
    routes() {
        this.server.use(express_1.default.json());
        this.server.use('/person', PersonRoute_1.default);
    }
}
exports.default = new App().server;
