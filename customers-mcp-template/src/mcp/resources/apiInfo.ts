import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

export const registerApiInfoResource = (server: McpServer, baseUrl: string) => {
    server.registerResource(
        "customers:://api-info",
        "customers:://api-info",
        {
            description: "describes the customers rest API that this MCP server wraps"
        },
        () => ({
            contents: [
                {
                    uri: "customers:://api-info",
                    mimeType: "text/plain",
                    text: "Shoud list from customers API"
                }
            ]
        }))
}