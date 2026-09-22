import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { CustomerQuerySchema } from "../../domain/Customer.ts"

export const registerFindCustomerPrompt = (server: McpServer) => {
    server.registerPrompt(
        "find_costumer_prompt",
        {
            description: 'Prompt to search a customer using any combination of _id, name or phone',
            argsSchema: CustomerQuerySchema.shape
        },
        (query) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: 'text',
                        text: `Please, search an user with the following query using the get_customer or list_customers tools. Query ${JSON.stringify(query)}`
                    }
                }
            ]
        })
    )
}