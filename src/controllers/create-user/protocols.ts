import { User } from "../../models/user"

export interface CreateUserParams {
    name: string
    email: string
    emailConfirm?: string
    password: string
}

export interface ICreateUserRepository {
    CreateUser(params: CreateUserParams): Promise<User>
}