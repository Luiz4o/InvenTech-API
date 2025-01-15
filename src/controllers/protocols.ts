export interface HttpResponse<T> {
    statusCode: number,
    body: T | string
}

export interface HttpRequest {
    params?: any
    header?: any
    body: any

}