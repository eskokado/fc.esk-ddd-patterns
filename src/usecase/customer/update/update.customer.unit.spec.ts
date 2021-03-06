import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory
                .createWithAddress(
                  "John", 
                  new Address("Street 1", 123, "zip 1", "city 1")
                );

const input = {
  id: customer.id,
  name: "John update",
  Address: {
    street: "Street update",
    number: 456,
    zip: "Zip update",
    city: "City update",
  }
}

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  }
}

describe("Unit Test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await updateCustomerUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    })

    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository); 
    
    expect(async () => {
      return await updateCustomerUseCase.execute(input);
    }).rejects.toThrow("Customer not found");
  })

  it('Should thrown an error when name is missing',async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(updateCustomerUseCase.execute(input))
      .rejects.toThrow("customer: Name is required");
  });

  it('Should thrown an error when street is missing', async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    input.name = "John";
    input.Address.street = "";

    await expect(updateCustomerUseCase.execute(input))
      .rejects.toThrow("address: Street is required");
  });
});  
