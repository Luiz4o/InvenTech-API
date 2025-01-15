import { Product } from "../../models/products"
import { HttpResponse } from "../protocols"

export interface IGetProductsController {
    handle():Promise<HttpResponse<Product[]>>
}

export interface IGetProductsRepository {
    getProducts(): Promise<Product[]>
}