import { z } from 'zod';




export const addItemSchema = z.object({
    code: z.string(),
    price: z.string().transform((val) => parseFloat(val)),
    stock: z.string().transform((val) => parseInt(val, 10)),
    name: z.string().min(3, { message: "Minimum name size 3" }),
    image: z.string(),
    description: z.string().min(10),
    category: z.string({
        required_error: "Please select an email to display.",
    })

})
