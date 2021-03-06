import Order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface";
import ProductModel from "../../product/sequelize/product.model";
import OrderItemModel from "../sequelize/order-item.model";
import OrderModel from "../sequelize/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    let orderModel;
    var id = entity.id;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    id = entity.id;
    await OrderModel.destroy({
      where: { id },
    });
    
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: [{ model: OrderItemModel, as: 'items', include: [{ model: ProductModel, as: 'product'}] }],
        // include: [{ model: OrderItemModel, as: 'items' }, { model: ProductModel, as: 'product'}],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    return new Order(
      id, orderModel.customer_id, 
      orderModel.items.map((e) => new OrderItem(
        e.id, e.product.name, e.price, e.product_id, e.quantity
      ))
    );    
 }

  async findAll(): Promise<Order[]> {
    const orderModel = await OrderModel.findAll(      
      {
        include: [{ model: OrderItemModel, as: 'items', include: [{ model: ProductModel, as: 'product'}] }],
      }
    );

    return orderModel.map((order) => {
      return new Order(
        order.id, order.customer_id,
        order.items.map((e) => new OrderItem(
          e.id, e.product.name, e.product.price, e.product_id, e.quantity
        ))
      );
    });
  }
}