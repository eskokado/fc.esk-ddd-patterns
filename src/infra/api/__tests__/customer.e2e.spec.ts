import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  })

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John",
        Address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "12345"
        }
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John");
    expect(response.body.Address.street).toBe("Street");
    expect(response.body.Address.city).toBe("City");
    expect(response.body.Address.number).toBe(123);
    expect(response.body.Address.zip).toBe("12345");
  });
});