import test, { after, before, describe } from "node:test"
import { Client } from "@modelcontextprotocol/sdk/client"
import assert from "node:assert"
import { createTestClient } from "../helper.ts"


describe('Customer Resources', () => {
    let client: Client

    before(async () => {
        client = await createTestClient()
    })

    after(async () => {
        await client.close()
    })

    test('should return teh find_customer_prompot', async () => {
        const result = await client.getPrompt({
            name: 'find_costumer_prompt',
            arguments: {
                name: 'John'
            }
        })
        const text = result.messages[0].content
        console.log(text)
        assert.ok('text' in text && text.text.includes('get_customer'), 'should reference get_customer')
        assert.ok('text' in text && text.text.includes('John'), 'should reference the query')
    })
})