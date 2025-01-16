import { Product } from "../../models/products";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateProductParams, ICreateProductController, ICreateProductRepository } from "./protocols";

export class CreateProductController implements ICreateProductController{
    createProductRepository: ICreateProductRepository
    
    constructor(createProductRepository: ICreateProductRepository) {
        this.createProductRepository = createProductRepository
    }

    async handle(httpRequest: HttpRequest<CreateProductParams>): Promise<HttpResponse<Product | string>> {
        try{
            const requiredFields: string[] = ['nameProduct', 'description', 'image', 'price']

            for( const field of requiredFields) {
                console.log(field)
                if(!httpRequest?.body?.[field as keyof CreateProductParams] ){
                    return badRequest(`Falta passar o campo ${field}`)
                }
            }

            if(!httpRequest.body){
                return badRequest('Houve algum erro no body fornecido')
            }

            if(!httpRequest.file){
                return badRequest('Imagem é obrigatória')
            }
            
            const imageBuffer = httpRequest.file.buffer;
            
            const product = await this.createProductRepository.createProduct({
                nameProduct: httpRequest.body.nameProduct,
                description: httpRequest.body.description,
                price: httpRequest.body.price,
                image: imageBuffer
            })

            console.log(httpRequest.body)

            return created(product)

        } catch (error) {
            return serverError()
        }
    }
}