import { Product } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateProductParams, ICreateProductController, ICreateProductRepository } from "./protocols";

export class CreateProductController implements ICreateProductController{
    createProductRepository: ICreateProductRepository
    
    constructor(createProductRepository: ICreateProductRepository) {
        this.createProductRepository = createProductRepository
    }

    async handle(httpRequest: HttpRequest<CreateProductParams>): Promise<HttpResponse<Product>> {
        try{

            const requiredFields: string[] = ['nameProduct', 'description', 'image', 'price']

            for( const field of requiredFields) {
                if(!httpRequest?.body?.[field as keyof CreateProductParams] ){
                    return {
                        statusCode: 400,
                        body: `É preciso passaara ${field}`
                    }
                }
            }

            const product = await this.createProductRepository.createProduct(httpRequest.body!)

            return {
                statusCode: 201,
                body: product
            }
            
        } catch (error) {
            return {
                statusCode:500,
                body: 'Algo na criação do produto deu errado'
            }
        }
    }
}