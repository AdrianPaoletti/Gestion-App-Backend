"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.initilizeServer = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = __importDefault(require("debug"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const debug = (0, debug_1.default)("app:server");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
const initilizeServer = (port) => new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
        debug(chalk_1.default.green(`Listening on port ${port}`));
        resolve(server);
    });
    server.on("error", (error) => {
        debug(chalk_1.default.red("An error with the server occurred"));
        if (error.code === "EADDRINUSE") {
            debug(chalk_1.default.red(`Port ${port} is in use`));
        }
        reject();
    });
    server.on("close", () => {
        debug(chalk_1.default.yellow("Server disconnected."));
    });
});
exports.initilizeServer = initilizeServer;
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/users", userRoutes_1.default);
