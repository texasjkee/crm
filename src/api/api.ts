import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "../components/common/const/localStorage";

export const $api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY),
    },
});

export enum URL {
    LOGIN = "auth/login",
    REGISTRATION = "auth/register",
    CREATE_EVENTS = "events",
    UPDATE_NAME = "user"
}
