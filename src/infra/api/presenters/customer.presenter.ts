import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";
export default class CustomerPresenter {
  static listXml(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML({
      customers: {
        customer: data.customers.map((customer) => ({
          id: customer.id,
          name: customer.name,
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zip,
          city: customer.Address.city, 
        })),
      }
    }, xmlOptions);
  }
}