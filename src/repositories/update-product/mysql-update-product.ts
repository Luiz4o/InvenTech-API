import { FieldPacket, ResultSetHeader } from "mysql2";
import { IUpdateProductRepository, UpdateProductParams } from "../../controllers/update-product/protocols";
import { MysqlClient } from "../../database/mysql";
import { Product } from "../../models/products";

export class MysqlUpdateProductRepository implements IUpdateProductRepository{
    async updateProduct(id: string,params: UpdateProductParams): Promise<Product> {
        const updateFields: string[] = [];
        const values: any[] = [];
        let setProductQuery = `UPDATE PRODUCTS SET`

        let hasFieldsToChange = false


        if (params.nameProduct) {
            setProductQuery += ` nameProduct = '${params.nameProduct}' `;
            hasFieldsToChange = true
        }
        if (params.description) {
            setProductQuery += ` descript = '${params.description}' `;
            if(hasFieldsToChange){setProductQuery+=' , '}
            hasFieldsToChange = true
        }
        if (params.image) {
            setProductQuery += ` image = '${params.image}' `;
            if(hasFieldsToChange){setProductQuery+=' , '}
            hasFieldsToChange = true
        }
        if (params.price) {
            setProductQuery += ` price = ${params.price} `;
            hasFieldsToChange = true
        }

        if (!hasFieldsToChange) {
            throw new Error('Nenhum campo para atualizar');
        }

        setProductQuery += `WHERE id = ${id}`

        const [result, _] = await MysqlClient.client?.execute(setProductQuery) as [ResultSetHeader, FieldPacket[]];

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