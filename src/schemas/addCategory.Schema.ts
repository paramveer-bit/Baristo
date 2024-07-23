import { z } from 'zod';




export const addCategorySchema = z.object({
    name: z.string().min(3, { message: "Minimum name size 3" }),
    image: z.string(),


})
