import { Product } from "../../models/products";
import { CreateProductParams } from "../create-product/protocols";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateProductController, IUpdateProductRepository, UpdateProductParams } from "./protocols";

export class UpdateProductController implements IUpdateProductController {
    updateProductRepository: IUpdateProductRepository
        
        constructor(updateProductRepository: IUpdateProductRepository) {
            this.updateProductRepository = updateProductRepository
        }

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Product>> {
        const id = httpRequest?.params?.id
        const body = httpRequest?.body

        try{
            if(!id){
                return{
                    statusCode:400,
                    body: 'Está faltando o ID do produto'
                }
            }


            const allowedFieldsToUpdate: (keyof UpdateProductParams)[] = ['nameProduct', 'description', 'image', 'price']
            const someFieldsNotAllowedToUpdate = Object.keys(body).some(key => !allowedFieldsToUpdate.includes(key as keyof UpdateProductParams))

            if( someFieldsNotAllowedToUpdate){
                return{
                    statusCode: 400,
                    body: 'Foram enviados campos que não permitidos'
                }
            }

            const product = await this.updateProductRepository.updateProduct(id, body)

            return {
                statusCode: 200,
                body: product
            }
        }catch (error) {
            return {
                statusCode: 500,
                body: 'Algo deu errado na atualização do produto'
            }
        }
    }

}