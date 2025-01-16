import {
  IUpdateStockProductRepository,
  UpdateStockProductParams,
} from "../../controllers/update-stock-product/protocols";
import { MysqlClient } from "../../database/mysql";
import { Stock } from "../../models/stock";

export class MysqlUpdateStockProductRepository
  implements IUpdateStockProductRepository
{
  async updateStockProduct(params: UpdateStockProductParams): Promise<Stock> {
    try {
      if (!MysqlClient.client) {
        await MysqlClient.connect();
      }

      const [affectedCount] = await MysqlClient.StockProductsTabelModel!.update(
        { quantity: params.quantity },
        { where: { id: params.id } }
      );

      if (affectedCount === 0)
        throw new Error("Não foi possível atualizar a quantidade");

      const updatedInstance =
        await MysqlClient.StockProductsTabelModel!.findByPk(params.id);
      return updatedInstance?.get();
    } catch (error: any) {
      throw new Error(`Erro ao criar o produto: ${error.message}`);
    }
  }
}
