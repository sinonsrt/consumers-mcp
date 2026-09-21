import test, { after, before, describe } from "node:test"
import { Client } from "@modelcontextprotocol/sdk/client"
import assert from "node:assert"
import { type Customer } from "../../src/domain/Customer.ts"
import { createTestClient } from "../helper.ts"

type CustomersResult = {
    structuredContent: {
        customers: Customer[]
    }
}

describe('Customer mcp suit', () => {
    let client: Client

    before(async () => {
        client = await createTestClient()
    })

    after(async () => {
        await client.close()
    })

    test('should list all customers', async () => {
        const result = await client.callTool({
            name: 'list_customers',
            arguments: {}
        }) as unknown as CustomersResult

        assert.ok(Array.isArray(result.structuredContent.customers), 'Customers result should be an array')
    })
})