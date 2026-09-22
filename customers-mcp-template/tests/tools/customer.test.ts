import test, { after, before, describe } from "node:test"
import { Client } from "@modelcontextprotocol/sdk/client"
import assert from "node:assert"
import { type CreatedCustomer, type Customer } from "../../src/domain/Customer.ts"
import { createTestClient } from "../helper.ts"

type CustomersResult = {
    structuredContent: {
        customers: Customer[]
    }
}

type CreateCustomerResult = {
    structuredContent: CreatedCustomer
}

type GetCustomerResult = {
    structuredContent: {
        customer: Customer
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

    test('should create a customer', async () => {
        const customer = {
            name: 'John Doe',
            phone: '1239424421'
        }
        const result = await client.callTool({
            name: 'create_customer',
            arguments: customer
        }) as unknown as CreateCustomerResult

        assert.ok(result.structuredContent.id, 'should return id')
        assert.deepStrictEqual(result.structuredContent.message, `user ${customer.name} created!`, 'should return message correct')
    })

    test('should get a customer', async () => {
        const customer = {
            name: 'John Martin',
            phone: '1239424423'
        }

        await client.callTool({
            name: 'create_customer',
            arguments: customer
        }) as unknown as CreateCustomerResult

        const result = await client.callTool({
            name: 'get_customer',
            arguments: {
                name: 'John Martin',
            }
        }) as unknown as GetCustomerResult

        assert.ok(result.structuredContent.customer._id, 'should return id')
        assert.deepStrictEqual(result.structuredContent.customer.name, customer.name, 'should return name correct')
    })
})