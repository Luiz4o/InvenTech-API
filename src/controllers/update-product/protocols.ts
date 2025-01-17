import { Product } from "../../models/products";

export interface UpdateProductParams {
    id: string
    nameProduct?: string
    price?: number
    description?: string
    image?: Buffer | null
}

export interface IUpdateProductRepository {
    updateProduct(params: UpdateProductParams, id: string): Promise<Product>
}