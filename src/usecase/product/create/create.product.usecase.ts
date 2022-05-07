import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;    
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    try {
      const product = ProductFactory.create("a", input.name, input.price);

      product.checkErrors();

      await this.productRepository.create(product);

      return {
        id: product.id,
        name: product.name,
        price: product.price
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}