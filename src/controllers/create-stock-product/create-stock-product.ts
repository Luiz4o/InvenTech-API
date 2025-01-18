import { Stock } from "../../models/stock";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateStockProductParams, ICreateStockProductRepository } from "./protocols";

export class CreateStockProductController implements IController {
  createStockProductRepository: ICreateStockProductRepository;

  constructor(createStockProductRepository: ICreateStockProductRepository) {
    this.createStockProductRepository = createStockProductRepository;
  }

  async handle(
    httpRequest: HttpRequest<CreateStockProductParams>
  ): Promise<HttpResponse<Stock | string>> {
    try {
      if (!httpRequest.body) {
        return badRequest("Houve algum erro no body fornecido");
      }

      const stock = await this.createStockProductRepository.CreateStockProduct({
        productId: httpRequest.body.productId,
        quantity: httpRequest.body.quantity,
      })


      return created(stock)
    } catch (error) {
      return serverError()
    }
  }
}
