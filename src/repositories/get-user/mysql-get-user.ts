import { IGetUserRepository } from "../../controllers/login-user/protocols";
import { MysqlClient } from "../../database/mysql";
import { User } from "../../models/user";

export class MysqlGetUserRepository implements IGetUserRepository {
  async getUserByEmail(email: string): Promise<User> {
    try {
      if (!MysqlClient.UsersTableModel) {
        throw new Error(`Erro ao acessar o banco`);
      }

      if (!email) {
        throw new Error("Email inválido");
      }

      const user = await MysqlClient.UsersTableModel!.findOne({
        where: { email: email },
      })


      if (!user) {
        throw new Error('Usuário não encontrado')
      }

      return user.get() as User;
    } catch (error: any) {
      throw new Error(`Erro ao criar o produto: ${error.message}`);
    }
  }
}
