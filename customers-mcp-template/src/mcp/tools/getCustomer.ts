import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { type CustomerService } from "../../application/customer.service.ts"
import { type CustomerQuery, CustomerQuerySchema, CustomerSchema } from "../../domain/Customer.ts"

export const registerGetCustomerTool = (server: McpServer, service: CustomerService) => {
    server.registerTool(
        "get_customer",
        {
            description: "Get a customer by _id, name or phone",
            inputSchema: CustomerQuerySchema,
            outputSchema: {
                customer: CustomerSchema.nullable().describe('Customer details if found, otherwise null!')
            }
        },
        async (query: CustomerQuery) => {
            try {
                const customer = await service.getCustomer(query)

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(customer, null, 2)
                        }
                    ],
                    structuredContent: { customer }
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: `Failed to get a customer. Error ${error instanceof Error ? error.message : error}`
                        }
                    ]
                }
            }
        })
}