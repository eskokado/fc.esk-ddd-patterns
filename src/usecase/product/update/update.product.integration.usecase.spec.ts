import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infra/product/repository/product.repository";
import ProductModel from "../../../infra/product/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product 1", 10);

describe("Unit Test update product use case", () => {
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

  it("should update a product", async () => {
    const input = {
      id: product.id,
      name: "Product update",
      price: 20
    }
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should not find a product", async () => {
    const input = {
      id: product.id,
      name: "Product update",
      price: 20
    }
    const productRepository = new ProductRepository();

    const updateProductUseCase = new UpdateProductUseCase(productRepository); 
    
    expect(() => {
      return updateProductUseCase.execute(input);
    }).rejects.toThrow("Product not found");
  })

  it('Should thrown an error when name is missing',async () => {
    const input = {
      id: product.id,
      name: "",
      price: 10
    }

    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    await expect(updateProductUseCase.execute(input))
      .rejects.toThrow("Name is required");
  });

  it('Should thrown an error when price be less than zero',async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: "Product 1",
      price: -10
    }

    await expect(updateProductUseCase.execute(input))
      .rejects.toThrow("Price must be greater than zero");
  });
});