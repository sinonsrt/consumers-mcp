import test, { after, before, describe } from "node:test"
import { Client } from "@modelcontextprotocol/sdk/client"
import assert from "node:assert"
import { type CustomerMutation, type Customer } from "../../src/domain/Customer.ts"
import { createTestClient } from "../helper.ts"

type CustomersResult = {
    structuredContent: {
        customers: Customer[]
    }
}

type CustomerMutationResult = {
    structuredContent: CustomerMutation
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
        }) as unknown as CustomerMutationResult

        assert.ok(result.structuredContent.id, 'should return id')
        assert.deepStrictEqual(result.structuredContent.message, `user ${customer.name} created!`, 'should return message correct')
    })

    test('should update customer', async () => {
        const newCustomer = {
            name: 'John Doe',
            phone: '1239424421'
        }

        const { structuredContent: { id } } = await client.callTool({
            name: 'create_customer',
            arguments: newCustomer
        }) as unknown as CustomerMutationResult

        const customer = {
            _id: id,
            name: 'Batman',
            phone: '1239424428'
        }
        const result = await client.callTool({
            name: 'update_customer',
            arguments: customer
        }) as unknown as CustomerMutationResult

        assert.deepStrictEqual(result.structuredContent.id, id, 'should return the correct id')
        assert.ok(result.structuredContent.message, 'should return a message')
    })

    test('should get a customer', async () => {
        const customer = {
            name: 'John Martin',
            phone: '1239424423'
        }

        await client.callTool({
            name: 'create_customer',
            arguments: customer
        }) as unknown as CustomerMutationResult

        const result = await client.callTool({
            name: 'get_customer',
            arguments: {
                name: 'John Martin',
            }
        }) as unknown as GetCustomerResult

        assert.ok(result.structuredContent.customer._id, 'should return id')
        assert.deepStrictEqual(result.structuredContent.customer.name, customer.name, 'should return name correct')
    })

    test('should delete a customer', async () => {
        const newCustomer = {
            name: 'John Doe',
            phone: '1239424421'
        }

        const { structuredContent: { id } } = await client.callTool({
            name: 'create_customer',
            arguments: newCustomer
        }) as unknown as CustomerMutationResult

        const result = await client.callTool({
            name: 'delete_customer',
            arguments: {
                id
            }
        }) as unknown as CustomerMutationResult

        assert.deepStrictEqual(result.structuredContent.id, id, 'should return the correct id')
        assert.ok(result.structuredContent.message, 'should return a message')
    })
})