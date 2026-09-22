import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { type CustomerService } from "../../application/customer.service.ts"
import z from 'zod/v3'

export const registerCreateCustomerTool = (server: McpServer, service: CustomerService) => {
    server.registerTool(
        "create_customer",
        {
            description: "Create a new customers",
            inputSchema: {
                name: z.string().describe('Customer name'),
                phone: z.string().describe('Customer phonenumber')
            },
            outputSchema: {
                message: z.string().describe('Successfully message'),
                id: z.string().describe('MongoDB confirmation ID'),
            }
        },
        async ({ name, phone }) => {
            try {
                const response = await service.createCustomer({ name, phone })

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(response, null, 2)
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
                            text: `Failed to create customer. Error ${error instanceof Error ? error.message : error}`
                        }
                    ]
                }
            }
        })
}