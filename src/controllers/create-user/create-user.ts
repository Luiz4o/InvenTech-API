import { User } from "../../models/user";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

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
        return badRequest("Houve algum erro no body fornecido");
      }

      const hashPassword = await bcrypt.hash(httpRequest.body.password, 10)

      console.log(hashPassword)

      const user = await this.createUserRepository.CreateUser({
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        password: hashPassword,
      });

      console.log(httpRequest.body);

      return created(user);
    } catch {
      return serverError();
    }
  }
}
