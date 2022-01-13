import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUserCase } from "./ListAvailableCarsUserCase";

class ListAvailableCarsController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { f, v } = req.query;

    const listAvailableCarsUserCase = container.resolve(ListAvailableCarsUserCase);

    const cars = await listAvailableCarsUserCase.execute(
      (f as string && v as string) ? 
        { field: f as string, value: v as string } : null
    );

    return res.json(cars);
  }
}

export { ListAvailableCarsController }