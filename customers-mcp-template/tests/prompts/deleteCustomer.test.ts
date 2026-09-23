import test, { after, before, describe } from "node:test"
import { Client } from "@modelcontextprotocol/sdk/client"
import assert from "node:assert"
import { createTestClient } from "../helper.ts"

describe('delete_customer_prompot', () => {
    let client: Client

    before(async () => {
        client = await createTestClient()
    })

    after(async () => {
        await client.close()
    })

    test('should return the delete_customer_prompot', async () => {
        const result = await client.getPrompt({
            name: 'delete_costumer_prompt',
            arguments: {
                id: 'id-123'
            }
        })

        const text = result.messages[0].content

        assert.ok('text' in text && text.text.includes('id-123'), 'should reference the rigth id')
    })
})