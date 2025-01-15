import { Product } from "../../models/products"

export interface IGetProductsRepository {
    getProducts(): Promise<Product[]>
}