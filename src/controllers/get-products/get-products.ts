import { Product } from "../../models/products";
import { badRequest, ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetProductsRepository } from "./protocols";

export class GetProductsController implements IController {
    getProductsRepository: IGetProductsRepository

    constructor(getProductsRepository: IGetProductsRepository) {
        this.getProductsRepository = getProductsRepository
    }

    async handle(): Promise<HttpResponse<Product[] | string>> {
        try{
        const products = await this.getProductsRepository.getProducts()

        
    
        return ok<Product[]>(products)
    } catch (error) {
        return serverError()
    }

    }
}