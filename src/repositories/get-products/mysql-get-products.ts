import { IGetProductsRepository } from "../../controllers/get-products/protocols";
import { Product } from "../../models/products";

export class MysqlGetProductsRepository implements IGetProductsRepository {
    async getProducts(): Promise<Product[]> {
        return [{
            nameProduct: 'Tênis',
            description: 'Tênis de basquete',
            image: '13213213123',
            price: 400

        }]
    }

}