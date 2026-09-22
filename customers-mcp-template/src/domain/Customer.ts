import z from "zod/v3"

export const CustomerSchema = z.object({
    _id: z.string().optional(),
    name: z.string(),
    phone: z.string(),
})

export const CustomerQuerySchema = z.object({
    _id: z.string().describe('MongoDB Id').optional(),
    name: z.string().describe('Customer name').optional(),
    phone: z.string().describe('Customer phonenumber').optional(),
})

export type Customer = z.infer<typeof CustomerSchema>
export type CustomerQuery = z.infer<typeof CustomerQuerySchema>

export type CreatedCustomer = {
    message: string,
    id: string
}