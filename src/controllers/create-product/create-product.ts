import { Product } from "../../models/products";
import { MysqlCreateStockProductRepository } from "../../repositories/craete-stock-product/mysql-create-stock-product";
import { CreateStockProductController } from "../create-stock-product/create-stock-product";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateProductParams, ICreateProductRepository } from "./protocols";

export class CreateProductController implements IController {
  createProductRepository: ICreateProductRepository;

  constructor(createProductRepository: ICreateProductRepository) {
    this.createProductRepository = createProductRepository;
  }

  async handle(
    httpRequest: HttpRequest<CreateProductParams>
  ): Promise<HttpResponse<Product | string>> {

    try {
      const requiredFields: string[] = [
        "nameProduct",
        "description",
        "price"
      ];

      for (const field of requiredFields) {
        console.log(field);
        if (!httpRequest?.body?.[field as keyof CreateProductParams]) {
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

      const product = await this.createProductRepository.createProduct({
        nameProduct: httpRequest.body.nameProduct,
        description: httpRequest.body.description,
        price: httpRequest.body.price,
        image: imageBuffer,
      });

      const mysqlCreateStockProductRepository = new MysqlCreateStockProductRepository()
      const createStockProductController = new CreateStockProductController(mysqlCreateStockProductRepository)

      createStockProductController.handle({
        body: {
          productId: product.id,
          quantity: 0
        }
      }
      )

      return created(product);
    } catch (error) {
      console.error("Erro ao criar produto:", error)
      return serverError();
    }
  }
}
