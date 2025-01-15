import { IUpdateProductRepository, UpdateProductParams } from "../../controllers/update-product/protocols";
import { MysqlClient } from "../../database/mysql";
import { Product } from "../../models/products";

export class MysqlUpdateProductRepository implements IUpdateProductRepository{
    async updateProduct(id: string,params: UpdateProductParams): Promise<Product> {
        const updateFields: string[] = [];
        const values: any[] = [];

        if (params.nameProduct) {
            updateFields.push('productName = ?');
            values.push(params.nameProduct);
        }
        if (params.description) {
            updateFields.push('description = ?');
            values.push(params.description);
        }
        if (params.image) {
            updateFields.push('image = ?');
            values.push(params.image);
        }
        if (params.price) {
            updateFields.push('price = ?');
            values.push(params.price);
        }

        if (updateFields.length === 0) {
            throw new Error('Nenhum campo para atualizar');
        }

        values.push(id);
    
        const setProductQuery = `UPDATE PRODUCTS SET ${updateFields.join(', ')} WHERE id = ?`;

        // Executa a query
        const [result]: any = await MysqlClient.client?.execute(setProductQuery, values);

        // Verifica se a atualização foi bem-sucedida
        if (result.affectedRows === 0) {
            throw new Error(`Produto com ID ${id} não encontrado`);
        }
        
        const updatedProduct: Product = {
            id: id,
            nameProduct: params.nameProduct || '',
            description: params.description || '',
            image: params.image || '',
            price: params.price || 0,
        };
                                
            return updatedProduct;
        }

}