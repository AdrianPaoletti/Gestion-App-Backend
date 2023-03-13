"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../database/models/user"));
const error_1 = __importDefault(require("../../interfaces/error"));
dotenv_1.default.config();
const loginUser = async (req, res, next) => {
    const secret = process.env.SECRET;
    const { username, password } = req.body;
    try {
        const user = await user_1.default.findOne({ username });
        console.log("user", user);
        if (!user) {
            const error = new error_1.default("Incorrect username");
            error.code = 401;
            next(error);
        }
        else {
            const rightPassword = await bcrypt_1.default.compare(password, user.password);
            if (!rightPassword) {
                const error = new error_1.default("Incorrect password");
                error.code = 401;
                next(error);
            }
            else {
                const token = jsonwebtoken_1.default.sign({
                    id: user.id,
                    username: user.username,
                    password: user.password,
                }, secret);
                res.json({ token });
            }
        }
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
