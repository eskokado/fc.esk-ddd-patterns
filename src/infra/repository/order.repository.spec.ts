import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository test", () => {
    let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderResult = await orderRepository.find(order.id);

    expect(orderResult.id).toBe(order.id);
    expect(orderResult.customerId).toBe(order.customerId);
    expect(orderResult.total()).toBe(order.total());
    expect(orderResult.items[0].id).toBe(orderItem.id);
    expect(orderResult.items[0].name).toBe(orderItem.name);
    expect(orderResult.items[0].price).toBe(orderItem.price);
    expect(orderResult.items[0].productId).toBe(orderItem.productId);
    expect(orderResult.items[0].quantity).toBe(orderItem.quantity);
    expect(orderResult.items[0].subtotal()).toBe(orderItem.subtotal());
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 30);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      2
    );

    const order = new Order("123", "123", [orderItem1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    let orderResult = await orderRepository.find(order.id);

    expect(orderResult.id).toBe(order.id);
    expect(orderResult.customerId).toBe(order.customerId);
    expect(orderResult.total()).toBe(order.total());
    expect(orderResult.items[0].id).toBe(orderItem1.id);
    expect(orderResult.items[0].name).toBe(orderItem1.name);
    expect(orderResult.items[0].price).toBe(orderItem1.price);
    expect(orderResult.items[0].productId).toBe(orderItem1.productId);
    expect(orderResult.items[0].quantity).toBe(orderItem1.quantity);
    expect(orderResult.items[0].subtotal()).toBe(orderItem1.subtotal());

    const order2 = new Order("123", "123", [orderItem1, orderItem2]);
    await orderRepository.update(order2);

    orderResult = await orderRepository.find(order2.id);

    expect(orderResult.id).toBe(order2.id);
    expect(orderResult.customerId).toBe(order2.customerId);
    expect(orderResult.total()).toBe(order2.total());
    expect(orderResult.items[0].id).toBe(orderItem1.id);
    expect(orderResult.items[0].name).toBe(orderItem1.name);
    expect(orderResult.items[0].price).toBe(orderItem1.price);
    expect(orderResult.items[0].productId).toBe(orderItem1.productId);
    expect(orderResult.items[0].quantity).toBe(orderItem1.quantity);
    expect(orderResult.items[0].subtotal()).toBe(orderItem1.subtotal());
    expect(orderResult.items[1].id).toBe(orderItem2.id);
    expect(orderResult.items[1].name).toBe(orderItem2.name);
    expect(orderResult.items[1].price).toBe(orderItem2.price);
    expect(orderResult.items[1].productId).toBe(orderItem2.productId);
    expect(orderResult.items[1].quantity).toBe(orderItem2.quantity);
    expect(orderResult.items[1].subtotal()).toBe(orderItem2.subtotal());

  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

     const orderResult = await orderRepository.find(order.id);

    expect(orderResult.id).toBe(order.id);
    expect(orderResult.customerId).toBe(order.customerId);
    expect(orderResult.total()).toBe(order.total());
    expect(orderResult.items[0].id).toBe(orderItem.id);
    expect(orderResult.items[0].name).toBe(orderItem.name);
    expect(orderResult.items[0].price).toBe(orderItem.price);
    expect(orderResult.items[0].productId).toBe(orderItem.productId);
    expect(orderResult.items[0].quantity).toBe(orderItem.quantity);
    expect(orderResult.items[0].subtotal()).toBe(orderItem.subtotal());
 });

  it("should throw an error when order is not found", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("456ABC");
    }).rejects.toThrow("Order not found");
  });

  it("should find all order", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.changeAddress(address1);
    customerRepository.create(customer1);

    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 30);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      2
    );

    const order1 = new Order("123", "123", [orderItem1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);

    const order2 = new Order("456", "456", [orderItem2]);

    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });

})
