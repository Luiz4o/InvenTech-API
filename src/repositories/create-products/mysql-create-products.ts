import { FieldPacket, ResultSetHeader } from "mysql2";
import { CreateProductParams, ICreateProductRepository } from "../../controllers/create-product/protocols";
import { MysqlClient } from "../../database/mysql";
import { Product } from "../../models/products";

export class MysqlCreateProductRepository implements ICreateProductRepository{
    //Adicionar no controller uma chamada para a função getByName, para ver se realmente foi criado este objeto no banco
    async createProduct(params: CreateProductParams): Promise<Product> {
        const createProductQuery = `INSERT INTO PRODUCT(nameProduct, description, image, price)
                                VALUES ( ?, ?, ?, ?)`
    try {
        if (!MysqlClient.client) {
            throw new Error("Database client is not available.");
        }

        const [result, _] = await MysqlClient.client.execute(createProductQuery,[
            params.nameProduct,
            params.description, 
            params.image, 
            params.price]) as [ResultSetHeader, FieldPacket[]];

        if (result.affectedRows === 1) {
            // Produto foi inserido com sucesso, então podemos retornar o novo produto
            return {
                id: result.insertId.toString(),  // ID do novo produto inserido
                nameProduct: params.nameProduct,
                description: params.description,
                image: params.image,
                price: params.price
            };
        } else {
            throw new Error('Falha ao criar o produto');
        }
    }
    catch (error: any) {
            throw new Error(`Erro ao criar o produto: ${error.message}`);
        }
    }
}