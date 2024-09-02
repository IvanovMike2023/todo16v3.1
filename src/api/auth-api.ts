import axios, { AxiosResponse } from 'axios'
import {ResponseType, TaskType} from "./todolists-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a2bc24bd-0a71-4fa5-ad1c-5b343082cdb6'
    }
})

// api
export const AuthAPI = {
    AuthMe(data:AuthType) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>,AuthType>>(`auth/login`, data);
    }
}

// types
export type AuthType = {
    email: string
    password: string
    rememberMe: boolean
}
