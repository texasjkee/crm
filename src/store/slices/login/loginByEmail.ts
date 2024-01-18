import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_LOCAL_STORAGE_KEY } from "../../../components/common/const/localStorage";
import { type User } from "./types/user";
import { type ThunkConfig } from "../../types/stateSchema";
import { userActions } from "../user/userSlice";
import axios from "axios";
import { URL } from "../../../api/api";

interface LoginByUsernameProps {
    email: string;
    password: string;
}

export const loginUpByEmail = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>("auth/login", async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    const { email, password } = authData;

    try {
        const response = await extra.api.post<User>(URL.LOGIN, {
            email,
            password,
        });

        if (!response.data) {
            throw new Error();
        }
        localStorage.setItem(
            USER_LOCAL_STORAGE_KEY,
            JSON.stringify(response.data)
        );
        dispatch(userActions.setAuthData(response.data));

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(userActions.setError(error.response?.data.message));
        }
        console.error(error);
        return rejectWithValue("Wrong login or password");
    }
});
