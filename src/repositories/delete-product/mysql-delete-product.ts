import { FieldPacket, ResultSetHeader } from "mysql2";
import { IDeleteProductRepository } from "../../controllers/delete-product/protocols";
import { MysqlClient } from "../../database/mysql";

export class MysqlDeleteProductRepository implements IDeleteProductRepository{
    async deleteProduct(id: string): Promise<string> {
        const deleteProductQuery = `DELETE FROM PRODUCTS WHERE id = ?`

        const [result, _] = await MysqlClient.client?.execute(deleteProductQuery, [id]) as [ResultSetHeader, FieldPacket[]]

    if (result.affectedRows === 0) {
        throw new Error(`Produto com ID ${id} não deletado, verifique o ID e tente novamente`);
    }
        
        return 'Produto deletado com sucesso'
    }

}