import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");    
            customer.checkErrors();    
        }).toThrowError("customer: Id is required");
    });    

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
            customer.checkErrors();    
        }).toThrowError("customer: Name is required");
    });    

    it("should throw error when id and name is empty", () => {
        expect(() => {
            let customer = new Customer("", "");
            customer.checkErrors();    
        }).toThrowError("customer: Id is required, customer: Name is required");
    });    

    it("should change name", () => {

        // Arrange
        const customer = new Customer("123", "John");

        // Act
        customer.changeName("Jane");

        // Assert
        expect(customer.name).toBe("Jane");
    });    

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1")
        const address = new Address("Street 1",123,"13330-250","São Paulo");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });    

    it("should throw error when address is undefined when you activate a customer", () => {

        expect(()=> {
            const customer = new Customer("1", "Customer 1")
            customer.activate();
            customer.checkErrors();    
        }).toThrowError("customer: Address is mandatory to activate a customer");        

    });  

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1")

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });  
});