import { Stock } from "../../models/stock";

export interface UpdateStockProductParams {
    id: string,
    quantity: number,
}

export interface IUpdateStockProductRepository {
    updateStockProduct(params: UpdateStockProductParams, id: string): Promise<Stock>
}