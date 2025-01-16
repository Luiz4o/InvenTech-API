import { Product } from "../../models/products";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateProductController {
    handle(httpRequest: HttpRequest<CreateProductParams>): Promise<HttpResponse<Product | string>>
}

export interface CreateProductParams {
    nameProduct: string
    price: number
    description: string
    image: Buffer
}

export interface ICreateProductRepository {
    createProduct(params: CreateProductParams) : Promise<Product>
}