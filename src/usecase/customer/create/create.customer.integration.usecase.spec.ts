import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../infra/customer/repository/customer.repository";
import CustomerModel from "../../../infra/customer/sequelize/customer.model";
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


describe("Unit Test create customer use case", () => {
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


  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
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

  it('Should thrown an error when name is missing',async () => {
    const customerRepository = new CustomerRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(createCustomerUseCase.execute(input))
      .rejects.toThrow("Name is required");
  });

  it('Should thrown an error when street is missing',async () => {
    const customerRepository = new CustomerRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "John";
    input.Address.street = "";

    await expect(createCustomerUseCase.execute(input))
      .rejects.toThrow("Street is required");
  });
});
