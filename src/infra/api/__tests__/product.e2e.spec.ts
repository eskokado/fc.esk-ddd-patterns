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
});