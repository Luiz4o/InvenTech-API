import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/create-user/protocols";
import { MysqlClient } from "../../database/mysql";
import { User } from "../../models/user";

export class MysqlCreateUserRepository implements ICreateUserRepository {
  async CreateUser(params: CreateUserParams): Promise<User> {
    try {
      if (!MysqlClient.UsersTableModel) {
        throw new Error("Falha ao se conectar com o banco");
      }

      const user: User = (
        await MysqlClient.UsersTableModel.create({
          name: params.name,
          email: params.email,
          password: params.password,
        })
      ).get() as User;

      console.log(user);

      return user;
    } catch (error: any) {
      throw new Error(`Erro ao criar o produto: ${error.message}`);
    }
  }
}
