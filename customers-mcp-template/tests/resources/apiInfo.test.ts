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

describe('Customer Resources', () => {
    let client: Client

    before(async () => {
        client = await createTestClient()
    })

    after(async () => {
        await client.close()
    })

    test('should list the customers://api-info resources', async () => {
        const { resources } = await client.listResources()
        const info = resources.find(r => r.uri === "customers://api-info")

        assert.ok(resources, 'resource customers://api-info should exists')
    })
})