import { HttpRequest, HttpResponse } from "../protocols"

export interface IDeleteProductController {
    handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<String>>
}

export interface IDeleteProductRepository {
    deleteProduct(id: string): Promise<string>
}