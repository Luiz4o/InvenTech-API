import { Product } from "../../models/products";

export interface CreateProductParams {
    nameProduct: string
    price: number
    description: string
    image: Buffer
}

export interface ICreateProductRepository {
    createProduct(params: CreateProductParams) : Promise<Product>
}