import { Stock } from "../../models/stock"

export interface CreateStockProductParams {
    productId: string,
    quantity: number,
}

export interface ICreateStockProductRepository{
    CreateStockProduct(params: Stock) : Promise<Stock>
}
