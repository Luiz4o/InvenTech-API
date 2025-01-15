import { IGetProductsRepository } from "../../controllers/get-products/protocols";
import { MysqlClient } from "../../database/mysql";
import { Product } from "../../models/products";

export class MysqlGetProductsRepository implements IGetProductsRepository {
    async getProducts(): Promise<Product[]> {
        const getAllProducts = 'SELECT * FROM PRODUCTS';

        return new Promise((resolve, reject) => {
            MysqlClient.client?.query(getAllProducts, (error: string, results: any[]) => {
                if (error) {
                    return reject(error);
                }

                const products: Product[] = results.map(result => ({
                    id: result.id,
                    nameProduct: result.nameProduct,
                    description: result.description,
                    image: result.image,
                    price: result.price
                }));

                resolve(products); // Resolve a Promise com os produtos
            });
        });
    }

    async getProductByName(name: string): Promise<Product> {
        const getProductByName = `SELECT * FROM PRODUCTS
                                WHERE nameProduct = ?`

        const [rows]: any = await MysqlClient.client?.execute(getProductByName, [name]);

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