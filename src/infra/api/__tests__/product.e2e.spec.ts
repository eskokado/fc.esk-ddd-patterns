import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {  
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Product 1",
        price: 15
      });
    
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(15);
  });

  it("should list all product", async () => {
    const response1 = await request(app)
      .post("/products")
      .send({
        name: "Product 1",
        price: 15
      });
    
    expect(response1.status).toBe(201);

    const response2= await request(app)
      .post("/products")
      .send({
        name: "Product 2",
        price: 25
      });
    
    expect(response2.status).toBe(201);

    const listResponse = await request(app)
      .get("/products").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("Product 1");
    expect(product1.price).toBe(15);

    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(25);
  });
});