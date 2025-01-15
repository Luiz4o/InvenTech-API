import { HttpResponse } from "./protocols"

export const created = <T>(body:any): HttpResponse<T> => {
    return {
        statusCode:201,
        body:body
    }
}

export const ok = <T>(body:any): HttpResponse<T> => {
    return {
        statusCode:200,
        body:body
    }
}

export const badRequest = (message:string): HttpResponse<string> => {
    return {
        statusCode:400,
        body:message
    }
}

export const serverError = (): HttpResponse<string> => {
    return {
        statusCode:500,
        body: "Ocorreu um erro no servidor"
    }
}