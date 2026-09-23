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

export const CustomerUpdateSchema = CustomerQuerySchema.extend({
    _id: z.string().describe('MongoDB Id')
})

export const CustomerMutationSchema = z.object({
    id: z.string().describe('MongoDB Id'),
    message: z.string().optional().describe('Confirmatio message'),
    isError: z.boolean().optional().describe('Indicates if exists and error')
})


export type Customer = z.infer<typeof CustomerSchema>
export type CustomerQuery = z.infer<typeof CustomerQuerySchema>
export type CustomerUpdate = z.infer<typeof CustomerUpdateSchema>
export type CustomerMutation = z.infer<typeof CustomerMutationSchema>

