import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import z from 'zod/v3'
import { type CustomerService } from "../../application/customer.service.ts"
import { CustomerMutationSchema } from "../../domain/Customer.ts"

export const registerDeleteCustomerTool = (server: McpServer, service: CustomerService) => {
    server.registerTool(
        "delete_customer",
        {
            description: "Delete a customers",
            inputSchema: {
                id: z.string().describe('MongoDB Id')
            },
            outputSchema: CustomerMutationSchema.shape
        },
        async ({ id }) => {
            try {
                const response = await service.deleteCustomer(id)

                return {
                    content: [
                        {
                            type: 'text',
                            text: response.message ?? ""
                        }
                    ],
                    structuredContent: response
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: `Failed to delete customer. Error ${error instanceof Error ? error.message : error}`
                        }
                    ]
                }
            }
        })
}