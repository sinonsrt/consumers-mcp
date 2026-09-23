import type { CustomerQuery, CustomerMutation, Customer, CustomerUpdate } from "../domain/Customer.ts"
import { CustomerHttpClient } from "../infrastructure/customerHttpClient.ts"

export class CustomerService {
    private readonly client: CustomerHttpClient

    constructor(baseUrl: string) {
        this.client = new CustomerHttpClient(baseUrl)
    }

    async listCustomers(): Promise<Customer[]> {
        return this.client.listCustomers()
    }

    async createCustomer(customer: Customer): Promise<CustomerMutation> {
        return this.client.createCustomer(customer);
    }

    async updateCustomer(customer: CustomerUpdate): Promise<CustomerMutation> {
        return this.client.updateCustomer(customer);
    }

    async deleteCustomer(id: string): Promise<CustomerMutation> {
        return this.client.deleteCustomer(id);
    }

    async getCustomer(query: CustomerQuery): Promise<Customer | null> {
        if (query._id) return this.client.getCustomerById(query._id)

        const customers = await this.client.listCustomers();

        return (customers.find((customer) => {
            const entries = Object.entries(query) as [keyof Customer, string][]

            return entries.every(([key, value]) => {
                const customerValue = customer[key]
                return customerValue?.includes(value)
            })
        })) ?? null

    }
}