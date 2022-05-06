import Address from "../../customer/value-object/address";
import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendConsoleLogWhenAddressOfCustomerIsChangedHanler from "../../customer/event/handler/send-console-log-when-address-of-customer-is-changed.handler";
import SendConsoleLog1WhenCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log1-when-customer-is-created.handler copy";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log2-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("Should register an event product created handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("Should register an event of customer created handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
  });

  it("Should register an event of address customer changed handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogWhenAddressOfCustomerIsChangedHanler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);
  });

  it("Should unregister an event product created handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("Should unregister an event customer created handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
  });

  it("Should unregister an event customer address changed handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogWhenAddressOfCustomerIsChangedHanler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(0);
  });


  it("Should unregister all event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const eventHandler0 = new SendConsoleLogWhenAddressOfCustomerIsChangedHanler();
    const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler0);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler0);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
  });

  it("Should notify all event product created handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler); 

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 Description",
      price: 20.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreateHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    
  })

  it("Should notify all event customer created handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1); 
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2); 

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      address: new Address("Street 1", 123, "123456", "São Paulo"),
      active: true,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreateHandler.handle() deve ser chamado
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();    
  })

  it("Should notify all event customer address changed handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogWhenAddressOfCustomerIsChangedHanler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler); 

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      "CustomerAddressChangedEvent",
      "id01",
      "Name Customer 01",
      new Address("Street 1", 123, "123456", "São Paulo")
    );

    // Quando o notify for executado o SendEmailWhenProductIsCreateHandler.handle() deve ser chamado
    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  })

});