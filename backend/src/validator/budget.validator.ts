import * as z from "zod";

export const validationBudget = z.object({
    amount: z.number(),
    month: z.string()
})