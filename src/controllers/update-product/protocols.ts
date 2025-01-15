import { Product } from "../../models/products";

export interface UpdateProductParams {
    nameProduct?: string
    price?: number
    description?: string
    image?: string
}

export interface IUpdateProductRepository {
    updateProduct(params: UpdateProductParams): Promise<Product>
}