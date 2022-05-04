import express, {Request, Response} from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());

  const input = {
    name: req.body.name,
    price: req.body.price
  }

  const output = await usecase.execute(input);

  res.status(201).send(output);  
});