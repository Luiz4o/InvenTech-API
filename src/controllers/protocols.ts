export interface HttpResponse<T> {
    statusCode: number,
    body: T
}

export interface HttpRequest<B> {
    params?: any
    header?: any
    body?: B
    file?: Express.Multer.File 
}

export interface IController {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}