import Customer from "../entity/customer";
import CustomerInterface from "../entity/customer.interface";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";

export default class CustomerFactory {
  public static create(name: string): CustomerInterface {
    try {
      let customer = new Customer(uuid(), name);
      return customer;
    } catch (err: any) {
      throw new Error(err.message)
    }
  };

  public static createWithAddress(name: string, address: Address): CustomerInterface {
    try {
      let customer = new Customer(uuid(), name);
      customer.changeAddress(address);
      return customer;
    } catch (err: any) {
      throw new Error(err.message)
    }
  };

}