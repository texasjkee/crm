import { FormType } from "@/components/LoginForm/LoginForm";
import { USER_LOCALSTORAGE_KEY } from "@/const/localStorage";
import axios, { AxiosResponse } from "axios";

export const $api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY),
    },
});

export const AUTH = {
    signUp(values: FormType): Promise<AxiosResponse<FormType>> {
        return $api.post(`/auth/signup/`, values);
    },
    login(values: FormType): Promise<AxiosResponse<FormType>> {
        return $api.post(`/auth/login/`, values);
    },
};
