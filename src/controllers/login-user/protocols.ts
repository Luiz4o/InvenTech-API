import { User } from "../../models/user";

export interface LoginParams {
    email:string,
    password:string
}

export interface LoginReponse {
    message: string,
    token: string
}

export interface IGetUserRepository {
    getUserByEmail(email:string): Promise<User>
}