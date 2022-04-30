import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  id: "123",
  name: "John",
  Address: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City",
  }
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await createCustomerUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      Address: {
        street: input.Address.street,
        city: input.Address.city,
        number: input.Address.number,
        zip: input.Address.zip
      }
    });
  });
});
