import { Stock } from "../../models/stock";

export interface UpdateStockProductParams {
    quantity: number,
    id: string
}

export interface IUpdateStockProductRepository {
    updateStockProduct(params: UpdateStockProductParams, id: string): Promise<Stock>
}