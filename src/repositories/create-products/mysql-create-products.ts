import {
  CreateProductParams,
  ICreateProductRepository,
} from "../../controllers/create-product/protocols";
import { MysqlClient } from "../../database/mysql";
import { Product } from "../../models/products";

export class MysqlCreateProductRepository implements ICreateProductRepository {
  async createProduct(params: CreateProductParams): Promise<Product> {
    try {

      if (!MysqlClient.ProductsTableModel) {
        throw new Error("Falha ao se conectar com o banco");
      }

      const product: Product = (
        await MysqlClient.ProductsTableModel.create({
          nameProduct: params.nameProduct,
          description: params.description,
          price: params.price,
          image: params.image,
        })
      ).get() as Product;

      console.log(product);

      return product;
    } catch (error: any) {
      throw new Error(`Erro ao criar o produto: ${error.message}`);
    }
  }
}
