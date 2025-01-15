import { Product } from "../../models/products";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateProductController {
    handle(httpRequest: HttpRequest<CreateProductParams>): Promise<HttpResponse<Product>>
}

export interface CreateProductParams {
    nameProduct: string;
    price: number
    description: string
    image: string
}

export interface ICreateProductRepository {
    createProduct(params: CreateProductParams) : Promise<Product>
}