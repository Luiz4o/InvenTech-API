import { badRequest, ok } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import {  IDeleteProductRepository } from "./protocols";

export class DeleteProductController implements IController {
    deleteProductRepository: IDeleteProductRepository
            
    constructor(deleteProductRepository: IDeleteProductRepository) {
        this.deleteProductRepository = deleteProductRepository
    }

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<String>> {
        try{
            const id = httpRequest?.params?.id

            if(!id){
                return badRequest('Está faltando o ID do produto')
            }

            const messageReturn = await this.deleteProductRepository.deleteProduct(id)

            return ok<string>(messageReturn)
        }catch {
            return badRequest('Algo deu ao deletar o produto')
        }
    }

}