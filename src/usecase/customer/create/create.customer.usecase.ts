import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { v4 as uuid } from "uuid";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import NotificationError from "../../../domain/@shared/notification/notification.error";


export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;    
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    try {
      var address = new Address(
        input.Address.street, 
        input.Address.number, 
        input.Address.zip, 
        input.Address.city);

      const customer = CustomerFactory.createWithAddress(input.name, address);
      customer.checkErrors();

      await this.customerRepository.create(customer);

      return {
        id: customer.id,
        name: customer.name,
        Address: {
          street: customer.Address.street,
          city: customer.Address.city,
          number: customer.Address.number,
          zip: customer.Address.zip
        }
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
   }
}