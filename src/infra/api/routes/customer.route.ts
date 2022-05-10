import express, { Request, Response } from "express";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/customer.repository";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const input = {
      name: req.body.name,
      Address: {
        street: req.body.Address.street,
        city: req.body.Address.city,
        number: req.body.Address.number,
        zip: req.body.Address.zip
      } 
    }

    const output = await usecase.execute(input);

    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const output = await usecase.execute({});

    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.listXml(output)),
    });    
  } catch (err) {
    res.status(500).send(err);
  }
});