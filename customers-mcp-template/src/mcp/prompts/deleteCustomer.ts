import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import z from "zod/v3"

export const registerDeleteCustomerPrompt = (server: McpServer) => {
    server.registerPrompt(
        "delete_costumer_prompt",
        {
            description: 'Prompt to delete a customer using the _id',
            argsSchema: {
                id: z.string().describe('MongoDB Id')
            }
        },
        ({ id }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: 'text',
                        text: `Please, delete the following user with de id ${id}.`
                    }
                }
            ]
        })
    )
}