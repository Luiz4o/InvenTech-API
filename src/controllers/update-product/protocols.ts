import { Product } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateProductParams {
    nameProduct?: string
    price?: number
    description?: string
    image?: string
}

export interface IUpdateProductRepository {
    updateProduct(id: string,params: UpdateProductParams): Promise<Product>
}