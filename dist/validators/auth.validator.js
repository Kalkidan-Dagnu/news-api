"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().regex(/^[A-Za-z ]+$/, "Name must contain only alphabets"),
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must be strong"),
    role: zod_1.z.enum(["author", "reader"])
});
