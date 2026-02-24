"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const prisma_1 = require("../config/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_validator_1 = require("../validators/auth.validator");
const response_1 = require("../utils/response");
const signup = async (req, res) => {
    try {
        const data = auth_validator_1.signupSchema.parse(req.body);
        const existing = await prisma_1.prisma.user.findUnique({
            where: { email: data.email }
        });
        if (existing) {
            return res.status(409).json((0, response_1.errorResponse)("Conflict", ["Email already exists"]));
        }
        const hashed = await bcrypt_1.default.hash(data.password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashed,
                role: data.role
            }
        });
        return res.json((0, response_1.successResponse)("User created", user));
    }
    catch (err) {
        return res.status(400).json((0, response_1.errorResponse)("Validation Error", [err.message]));
    }
};
exports.signup = signup;
