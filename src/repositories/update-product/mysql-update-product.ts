import { FieldPacket, ResultSetHeader } from "mysql2";
import { IUpdateProductRepository, UpdateProductParams } from "../../controllers/update-product/protocols";
import { MysqlClient } from "../../database/mysql";
import { Product } from "../../models/products";

export class MysqlUpdateProductRepository implements IUpdateProductRepository{
    async updateProduct(params: UpdateProductParams): Promise<Product> {
        try {
            if (!MysqlClient.client) {
              await MysqlClient.connect();
            }

            const updateFields: any = {};

            if (params.nameProduct && params.nameProduct !== '') {
                updateFields.nameProduct = params.nameProduct;
            }
            if (params.description && params.description !== '') {
                updateFields.description = params.description;
            }
            if (params.price && params.price !== null) {
                updateFields.price = params.price;
            }
            if (params.image && params.image !== null) {
                updateFields.image = params.image;
            }
      
            const [affectedCount] = await MysqlClient.ProductsTableModel!.update(
              updateFields,
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