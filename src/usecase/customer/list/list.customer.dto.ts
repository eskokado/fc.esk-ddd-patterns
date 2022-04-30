export interface InputListCustomerDto {}

export type Customer = {
  id: string;
  name: string;
  Address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}

export interface OutputListCustomerDto {
  customers: Customer[];
}