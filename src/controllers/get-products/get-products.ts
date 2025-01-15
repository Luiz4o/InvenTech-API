import { IGetProductsController, IGetProductsRepository } from "./protocols";

export class GetProductsController implements IGetProductsController {
    getProductsRepository: IGetProductsRepository

    constructor(getProductsRepository: IGetProductsRepository) {
        this.getProductsRepository = getProductsRepository
    }

    async handle() {
        try{
        const products = await this.getProductsRepository.getProducts()
    
        return {
            statusCode: 200,
            body: products,
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Deu algum erro no servidor!'
        }
    }

    }
}