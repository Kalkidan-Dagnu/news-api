import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().regex(/^[A-Za-z ]+$/, "Name must contain only alphabets"),
  email: z.string().email(),
  password: z.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must be strong"),
  role: z.enum(["author", "reader"])
});