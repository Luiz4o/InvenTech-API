import bcrypt from 'bcrypt';
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IGetUserRepository, LoginParams, LoginReponse } from "./protocols";
import jwt from 'jsonwebtoken';

export class LoginController implements IController {
    getUserRepository: IGetUserRepository

    constructor(getUserRepository: IGetUserRepository) {
        this.getUserRepository = getUserRepository
    }


    async handle(httpRequest: HttpRequest<LoginParams>): Promise<HttpResponse<LoginReponse | string>> {
        try {
            if (!httpRequest.body) {
                return badRequest('Há algum erro no corpo da requisição')
            }

            const user = await this.getUserRepository.getUserByEmail(httpRequest.body!.email)

            if (!user) {
                return badRequest('Usuário não encontrado');
            }

            const passwordMatch = await bcrypt.compare(httpRequest.body!.password, user.password);

            if (!passwordMatch) {
                return badRequest('Senha inválida');
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET as string,
                { expiresIn: '24h' }
            );


            return ok({ message: 'Autenticação bem-sucedida', token })
        } catch (error) {
            console.log(error)
            return serverError()
        }

    }

}