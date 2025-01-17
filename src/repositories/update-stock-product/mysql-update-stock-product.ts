import {
  IUpdateStockProductRepository,
  UpdateStockProductParams,
} from "../../controllers/update-stock-product/protocols";
import { MysqlClient } from "../../database/mysql";
import { Stock } from "../../models/stock";

export class MysqlUpdateStockProductRepository
  implements IUpdateStockProductRepository {
  async updateStockProduct(params: UpdateStockProductParams, id: string): Promise<Stock> {
    try {
      if (!MysqlClient.StockProductsTableModel) {
        throw new Error("Falha ao se conectar com o banco");
      }

      const [affectedCount] = await MysqlClient.StockProductsTableModel!.update(
        { quantity: params.quantity },
        { where: { id: id } }
      );

      if (affectedCount === 0)
        throw new Error("Não foi possível atualizar a quantidade");

      const updatedInstance =
        await MysqlClient.StockProductsTableModel!.findByPk(id);
      return updatedInstance?.get();
    } catch (error: any) {
      throw new Error(`Erro ao criar o produto: ${error.message}`);
    }
  }
}
