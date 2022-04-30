import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "Name 1",
  new Address("Street 1", 123, "Zip 1", "City 1")
);

const customer2 = CustomerFactory.createWithAddress(
  "Name 2",
  new Address("Street 2", 456, "Zip 2", "City 2")
);

const input = [
  customer1,
  customer2
];

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve(input)),
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test for listing customer use case", () => {
  it("should list a customers", async () => {
    const customerRepository = MockRepository();
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

    const output = await listCustomerUseCase.execute({});

    expect(output.customers.length).toBe(2);

    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].Address.street).toBe(customer1.Address.street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].Address.street).toBe(customer2.Address.street);
  });
});