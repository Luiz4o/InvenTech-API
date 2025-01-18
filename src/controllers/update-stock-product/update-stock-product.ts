import { Stock } from "../../models/stock";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateStockProductRepository, UpdateStockProductParams } from "./protocols";

export class UpdateStockProductsController implements IController {
    updateStockProductRepository: IUpdateStockProductRepository

    constructor(updateStockProductRepository: IUpdateStockProductRepository) {
        this.updateStockProductRepository = updateStockProductRepository
    }

    async handle(httpRequest: HttpRequest<UpdateStockProductParams>): Promise<HttpResponse<Stock | string>> {
        const id = httpRequest?.params.id
        const body = httpRequest?.body

        try {
            if (!body) {
                return badRequest('Está faltando campos')
            }

            if (!id) {
                return badRequest('Falta o id do produto')
            }

            const stock = await this.updateStockProductRepository.updateStockProduct(body, id)

            return ok<Stock>(stock)
        } catch (error) {
            return serverError()
        }
    }

}