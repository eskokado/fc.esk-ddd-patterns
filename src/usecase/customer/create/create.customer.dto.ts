export interface InputCreateCustomerDto {
  name: string;
  Address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}

export interface OutputCreateCustomerDto {
  id: string;
  name: string;
  Address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}