import * as z from "zod";

export const validationUser = z.object({
    email: z.email(),
    password: z.string().min(8)
});