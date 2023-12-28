import axios, { type AxiosResponse } from "axios";
import { USER_LOCALSTORAGE_KEY } from "../const/localStorage";
import { FormType } from "../components/LoginForm/LoginForm";

export const $api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY),
    },
});

export const AUTH = {
    async signUp(values: FormType): Promise<AxiosResponse<FormType>> {
        return await $api.post(`/auth/signup/`, values);
    },
    async login(values: FormType): Promise<AxiosResponse<FormType>> {
        return await $api.post(`/auth/login/`, values);
    },
};
