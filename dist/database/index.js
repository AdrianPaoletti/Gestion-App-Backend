"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const chalk_1 = __importDefault(require("chalk"));
const mongoose_1 = __importDefault(require("mongoose"));
const debug = (0, debug_1.default)("app:database");
const connectDB = (connectionString) => new Promise((resolve, reject) => {
    mongoose_1.default.set("debug", true);
    mongoose_1.default.set("toJSON", {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret._v;
        },
    });
    mongoose_1.default
        .connect(connectionString)
        .then(() => {
        debug(chalk_1.default.green("DB conected"));
        resolve();
    })
        .catch((error) => {
        debug(chalk_1.default.red("Not posible to initialize the DB"));
        debug(error.message);
        reject();
        return;
    });
    mongoose_1.default.connection.on("close", () => {
        debug(chalk_1.default.yellow("Desconectado de la base de datos"));
    });
});
exports.default = connectDB;
