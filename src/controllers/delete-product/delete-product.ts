import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteProductController, IDeleteProductRepository } from "./protocols";

export class DeleteProductController implements IDeleteProductController {
    deleteProductRepository: IDeleteProductRepository
            
    constructor(deleteProductRepository: IDeleteProductRepository) {
        this.deleteProductRepository = deleteProductRepository
    }

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<String>> {
        try{
            const id = httpRequest?.params?.id

            if(!id){
                return {
                    statusCode: 400,
                    body: 'Está faltando o ID do produto'
                }
            }

            const messageReturn = await this.deleteProductRepository.deleteProduct(id)

            return {
                statusCode: 200,
                body:messageReturn
            }
        }catch {
            return {
                statusCode: 500,
                body: "Algo deu ao deletar o produto"
            }
        }
    }

}