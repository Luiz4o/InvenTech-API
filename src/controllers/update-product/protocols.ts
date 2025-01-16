import { Product } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateProductParams {
    id: string
    nameProduct?: string
    price?: number
    description?: string
    image?: Buffer | null
}

export interface IUpdateProductRepository {
    updateProduct(params: UpdateProductParams): Promise<Product>
}