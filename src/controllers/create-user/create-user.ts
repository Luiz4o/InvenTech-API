import { User } from "../../models/user";
import { badRequest, created, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import validator from "validator";


export class CreateUserController implements IController {
  createUserRepository: ICreateUserRepository;

  constructor(createUserRepository: ICreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const bcrypt = require("bcrypt");

      const requiredFields: string[] = ["name", "email", "password"];

      for (const field of requiredFields) {
        console.log(field);
        if (!httpRequest?.body?.[field as keyof CreateUserParams]) {
          return badRequest(`Falta passar o campo ${field}`);
        }
      }

      if (!httpRequest.body) {
        return badRequest("Algum campo fornecido está fora do padrão");
      }

      const emailValid = validator.isEmail(httpRequest.body.email)

      if (!emailValid || httpRequest.body.email !== httpRequest.body.emailConfirm) {
        return badRequest('Email inválido')
      }

      const hashPassword = await bcrypt.hash(httpRequest.body.password, 10)

      const user = await this.createUserRepository.CreateUser({
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        password: hashPassword,
      });

      return created<string>('Usuário criado com sucesso');
    } catch {
      return serverError();
    }
  }
}
