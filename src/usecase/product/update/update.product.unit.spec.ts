import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product 1", 10);

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  }
}

describe("Unit Test update product use case", () => {
  it("should update a product", async () => {
    const input = {
      id: product.id,
      name: "Product update",
      price: 20
    }
    const productRepository = MockRepository();
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
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    })

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

    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    await expect(updateProductUseCase.execute(input))
      .rejects.toThrow("product: Name is required");
  });

  it('Should thrown an error when price be less than zero',async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: "Product 1",
      price: -10
    }

    await expect(updateProductUseCase.execute(input))
      .rejects.toThrow("product: Price must be greater than zero");
  });
});