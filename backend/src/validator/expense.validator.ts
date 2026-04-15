import * as z from "zod";

export const validationExpense = z.object({
    category_id: z.string(),
    amount: z.number(),
    description: z.string().max(255).optional(),
    date: z.string(),
})