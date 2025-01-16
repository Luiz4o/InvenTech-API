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
      const requiredFields: string[] = ["productId", "quantity"];

      for (const field of requiredFields) {
        console.log(field);
        if (!httpRequest?.body?.[field as keyof CreateStockProductParams]) {
          return badRequest(`Falta passar o campo ${field}`);
        }
      }

      if (!httpRequest.body) {
        return badRequest("Houve algum erro no body fornecido");
      }

      if (!httpRequest.file) {
        return badRequest("Imagem é obrigatória");
      }

      const imageBuffer = httpRequest.file.buffer;

      const stock = await this.createStockProductRepository.CreateStockProduct({
        productId: httpRequest.body.productId,
        quantity: httpRequest.body.quantity,
      });

      console.log(httpRequest.body);

      return created(stock);
    } catch (error) {
      return serverError();
    }
  }
}
