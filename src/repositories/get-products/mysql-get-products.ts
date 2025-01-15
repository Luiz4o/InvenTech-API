import { IGetProductsRepository } from "../../controllers/get-products/protocols";
import { MysqlClient } from "../../database/mysql";
import { Product } from "../../models/products";

export class MysqlGetProductsRepository implements IGetProductsRepository {
    async getProducts(): Promise<Product[]> {
        const getAllProducts = 'SELECT * FROM PRODUCTS';

        try{

        const [rows]: any = await MysqlClient.client?.execute(getAllProducts);

        const products: Product[] = rows.map((result: any) => ({
            id: result.id,
            nameProduct: result.nameProduct,
            description: result.descript,
            image: result.image,
            price: result.price,
        }));

        return products
    }catch (error){
        throw new Error('Não foi possível buscar os produtos.');
    }

    }

    async getProductByName(name: string): Promise<Product> {
        const getProductByName = `SELECT * FROM PRODUCTS
                                WHERE nameProduct = '${name}'`

        const [rows]: any = await MysqlClient.client?.execute(getProductByName);

        if (rows.length === 0) {
            throw new Error(`Product with name "${name}" not found`);
        }
                            
        const result = rows[0];
                            
        const product: Product = {
            id: result.id,
            nameProduct: result.nameProduct,
            description: result.description,
            image: result.image,
            price: result.price,
        };
                            
        return product;
    }
}