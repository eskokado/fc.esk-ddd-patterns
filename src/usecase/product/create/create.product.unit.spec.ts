import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test create product use case", () => {
  it("should create a product", async () => {
    const input = {
      id: "123",
      name: "Product 1",
      price: 10
    }
    const productRepository = MockRepository();
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

    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(createProductUseCase.execute(input))
      .rejects.toThrow("product: Name is required");
  });

  it('Should thrown an error when price be less than zero',async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Product 1",
      price: -10
    }

    await expect(createProductUseCase.execute(input))
      .rejects.toThrow("product: Price must be greater than zero");
  });
});