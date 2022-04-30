import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infra/customer/repository/customer.repository";
import CustomerModel from "../../../infra/customer/sequelize/customer.model";
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

describe("Unit Test update customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();    
  });

  afterEach(async () => {
    await sequelize.close();
  });


  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    customerRepository.create(customer);
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await updateCustomerUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should not find a customer", async () => {
    const customerRepository = new CustomerRepository();
    customerRepository.create(customer);
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository); 
    
    expect(() => {
      return updateCustomerUseCase.execute(input);
    }).rejects.toThrow("Customer not found");
  })

  it('Should thrown an error when name is missing',async () => {
    const customerRepository = new CustomerRepository();
    customerRepository.create(customer);
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(updateCustomerUseCase.execute(input))
      .rejects.toThrow("Name is required");
  });

  it('Should thrown an error when street is missing',async () => {
    const customerRepository = new CustomerRepository();
    customerRepository.create(customer);
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    input.name = "John";
    input.Address.street = "";

    await expect(updateCustomerUseCase.execute(input))
      .rejects.toThrow("Street is required");
  });
});  
