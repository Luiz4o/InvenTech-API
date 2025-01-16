import { CreateStockProductParams, ICreateStockProductRepository } from "../../controllers/create-stock-product/protocols";
import { MysqlClient } from "../../database/mysql";
import { Stock } from "../../models/stock";

export class MysqlCreateStockProductRepository implements ICreateStockProductRepository {
  //Adicionar no controller uma chamada para a função getByName, para ver se realmente foi criado este objeto no banco
  async CreateStockProduct(params: CreateStockProductParams): Promise<Stock> {
    try {
      if (!MysqlClient.client) {
        await MysqlClient.connect();
      }

      const stock: Stock = (
        await MysqlClient.StockProductsTabelModel!.create({
          productId: params.productId,
          quantity: params.quantity,
        })
      ).get() as Stock;

      console.log(stock);

      return stock;
    } catch (error: any) {
      throw new Error(`Erro ao criar o produto: ${error.message}`);
    }
  }
}
