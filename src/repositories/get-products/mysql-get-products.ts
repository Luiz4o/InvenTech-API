import { IGetProductsRepository } from "../../controllers/get-products/protocols";
import { MysqlClient } from "../../database/mysql";
import { Product } from "../../models/products";

export class MysqlGetProductsRepository implements IGetProductsRepository {
    async getProducts(): Promise<Product[]> {
        try {

            const results = await MysqlClient.ProductsTableModel!.findAll({
                include: [
                    {
                        model: MysqlClient.StockProductsTabelModel!,
                        attributes: ['quantity'],
                    },
                ],
            });

            console.log(results[0])

            const products: Product[] = results.map((product: any) => {
                return {
                    id: product.id,
                    nameProduct: product.nameProduct,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    quantity: product.stock ? product.stock.quantity : 0, // Checa se 'stock' existe
                };
            })

            console.log(products)

            return products
        } catch (error) {
            throw new Error('Não foi possível buscar os produtos.');
        }

    }

    async getProductById(id: string): Promise<Product> {
        try {
            const result = await MysqlClient.ProductsTableModel?.findByPk(id);

            if (!result) {
                throw new Error(`Produto com ID ${id} não encontrado.`);
            }

            return result?.get();
        } catch (error) {
            throw new Error('Erro ao buscar o produto')
        }
    }
}