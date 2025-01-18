import { IDeleteProductRepository } from "../../controllers/delete-product/protocols";
import { MysqlClient } from "../../database/mysql";
import { serverError } from "../../controllers/helpers";

export class MysqlDeleteProductRepository implements IDeleteProductRepository {
    async deleteProduct(id: string): Promise<string> {
        try {

            if (!MysqlClient.ProductsTableModel) {
                throw new Error('')
            }
            const product = await MysqlClient.ProductsTableModel?.findByPk(id); // Buscar registro por ID
            if (product) {
                await product.destroy();
                return 'Produto deletado com sucesso'
            }
            throw new Error('Produto não encontrado, informe o id e tente novamente')
        } catch (error) {
            throw new Error(`Erro ao deletar o produto`)
        }
    }

}