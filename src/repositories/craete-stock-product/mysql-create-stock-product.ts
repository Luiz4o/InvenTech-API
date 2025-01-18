import { CreateStockProductParams, ICreateStockProductRepository } from "../../controllers/create-stock-product/protocols";
import { MysqlClient } from "../../database/mysql";
import { Stock } from "../../models/stock";

export class MysqlCreateStockProductRepository implements ICreateStockProductRepository {
  //Adicionar no controller uma chamada para a função getByName, para ver se realmente foi criado este objeto no banco
  async CreateStockProduct(params: CreateStockProductParams): Promise<Stock> {
    try {
      const stock: Stock = (
        await MysqlClient.StockProductsTableModel!.create({
          productId: params.productId,
          quantity: params.quantity,
        })
      ).get() as Stock;

      return stock;
    } catch (error: any) {
      throw new Error(`Erro ao criar o produto: ${error.message}`)
    }
  }
}
