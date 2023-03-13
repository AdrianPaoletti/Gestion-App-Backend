"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = require("./server/index");
const index_2 = __importDefault(require("./database/index"));
const port = process.env.PORT ?? process.env.SERVER_PORT ?? 6001;
window.exports = {};
(async () => {
    try {
        await (0, index_2.default)(process.env.MONGODB_STRING);
        (0, index_1.initilizeServer)(+port);
    }
    catch (error) {
        process.exit(1);
    }
})();
