import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;    
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    var customer;
    try {
      customer = await this.customerRepository.find(input.id);

      customer.changeName(input.name);

      customer.changeAddress(new 
              Address(
                input.Address.street, 
                input.Address.number, 
                input.Address.zip, 
                input.Address.city
              )
            );

      customer.checkErrors();

      await this.customerRepository.update(customer);
    } catch (err: any) {
      throw new Error(err.message);
    }   

    return {
      id: customer.id,
      name: customer.name,
      Address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      }
    };
  }
}