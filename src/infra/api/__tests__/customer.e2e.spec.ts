import { app, sequelize } from "../express";
import request from "supertest";
import { Customer } from "../../../usecase/customer/list/list.customer.dto";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

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

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John"
      });
    
    expect(response.status).toBe(500);
  });

  it("should list all customer", async () => {
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

    const response2 = await request(app)
      .post("/customers")
      .send({
        name: "Joao",
        Address: {
          street: "Street 2",
          city: "City 2",
          number: 1234,
          zip: "1234567"          
        }
      });
    expect(response2.status).toBe(201);

    const listResponse = await request(app)
      .get("/customers").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer1 = listResponse.body.customers[0];
    expect(customer1.name).toBe("John");
    expect(customer1.Address).toEqual(
      expect.objectContaining({
        street: 'Street',
        city: 'City',
        number: 123,
        zip: '12345'
      })
    );

    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe("Joao");
    expect(customer2.Address).toEqual(
      expect.objectContaining({
        street: 'Street 2',
        city: 'City 2',
        number: 1234,
        zip: '1234567'
      })
    );

    const listResponseXML = await request(app)
    .get("/customers")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain("<customers>");
    expect(listResponseXML.text).toContain("<customer>");
    expect(listResponseXML.text).toContain("<name>John</name>");
    expect(listResponseXML.text).toContain("<street>Street</street>");
    expect(listResponseXML.text).toContain("<city>City</city>");
    expect(listResponseXML.text).toContain("<number>123</number>");
    expect(listResponseXML.text).toContain("<zip>12345</zip>");
    expect(listResponseXML.text).toContain("</customer>");
    expect(listResponseXML.text).toContain("<name>John</name>");
    expect(listResponseXML.text).toContain("<street>Street 2</street>");
    expect(listResponseXML.text).toContain("<city>City 2</city>");
    expect(listResponseXML.text).toContain("<number>1234</number>");
    expect(listResponseXML.text).toContain("<zip>1234567</zip>");
  });

});