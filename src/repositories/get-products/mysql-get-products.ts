import { IGetProductsRepository } from "../../controllers/get-products/protocols";
import { MysqlClient } from "../../database/mysql";
import { Product } from "../../models/products";

export class MysqlGetProductsRepository implements IGetProductsRepository {
    async getProducts(): Promise<Product[]> {
        const sql = 'SELECT 1 AS result'

        
        return [{
            nameProduct: 'Tênis',
            description: 'Tênis de basquete',
            image: '13213213123',
            price: 400

        }]
    }

}