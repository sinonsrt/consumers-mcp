import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { type CustomerService } from "../../application/customer.service.ts"
import { CustomerMutationSchema, CustomerUpdateSchema } from "../../domain/Customer.ts"

export const registerUpdateCustomerTool = (server: McpServer, service: CustomerService) => {
    server.registerTool(
        "update_customer",
        {
            description: "Update a customers",
            inputSchema: CustomerUpdateSchema.shape,
            outputSchema: CustomerMutationSchema.shape
        },
        async (customer) => {
            try {
                const response = await service.updateCustomer(customer)

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
                            text: `Failed to update customer. Error ${error instanceof Error ? error.message : error}`
                        }
                    ]
                }
            }
        })
}