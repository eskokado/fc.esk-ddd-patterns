export default interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;
  checkErrors(): void;
  changeName(name: string): void;
  changePrice(price: number): void;
}