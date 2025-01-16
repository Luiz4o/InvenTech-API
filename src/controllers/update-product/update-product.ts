import { Product } from "../../models/products";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateProductRepository, UpdateProductParams } from "./protocols";

export class UpdateProductController implements IController {
    updateProductRepository: IUpdateProductRepository
        
        constructor(updateProductRepository: IUpdateProductRepository) {
            this.updateProductRepository = updateProductRepository
        }

    async handle(httpRequest: HttpRequest<UpdateProductParams>): Promise<HttpResponse<Product | string>> {
        const id = httpRequest?.params?.id
        const body = httpRequest?.body

        if(!body){
            return badRequest('Está faltando campos')
        }

        try{
            if(!id){
                return badRequest('Falta o id do produto')
            }


            const allowedFieldsToUpdate: (keyof UpdateProductParams)[] = ['nameProduct', 'description', 'image', 'price']
            const someFieldsNotAllowedToUpdate = Object.keys(body).some(key => !allowedFieldsToUpdate.includes(key as keyof UpdateProductParams))

            if( someFieldsNotAllowedToUpdate){
                return badRequest('Algum campo enviado não é permitido')
            }

            const product = await this.updateProductRepository.updateProduct(id, body)

            return ok<Product>(product)
        }catch (error) {
            return serverError()
        }
    }

}