import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infra/product/repository/product.repository";
import ProductModel from "../../../infra/product/sequelize/product.model";
import CreateProductUseCase from "./create.product.usecase";

describe("Unit Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();    
  });

  afterEach(async () => {
    await sequelize.close();
  });



  it("should create a product", async () => {
    const input = {
      id: "123",
      name: "Product 1",
      price: 10
    }
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it('Should thrown an error when name is missing',async () => {
    const input = {
      id: "123",
      name: "",
      price: 10
    }

    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(createProductUseCase.execute(input))
      .rejects.toThrow("Name is required");
  });

  it('Should thrown an error when price be less than zero',async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Product 1",
      price: -10
    }

    await expect(createProductUseCase.execute(input))
      .rejects.toThrow("Price must be greater than zero");
  });

});