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
    AuthMe(data:LoginType) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>,LoginType>>(`auth/login`, data);
    },
    me() {
        return instance.get<ResponseType <UserType>>(`auth/me`);
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`);
    }
}

// types authAPI
type UserType={
    id: number
    email: string
    login: string
}
export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}
