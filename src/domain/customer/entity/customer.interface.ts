import Address from "../value-object/address";

export default interface CustomerInterface {
  get id(): string;
  get name(): string;
  get rewardPoints(): number;
  get Address(): Address;
  changeAddress(address: Address): void;
  isActive(): boolean;
  validate(): void;
  changeName(name: string): void;
  checkErrors(): void;
  activate(): void;
  deactivate(): void;
  set Address(address: Address);
  addRewardPoints(points: number): void;
}