import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_LOCALSTORAGE_KEY } from "../../../const/localStorage";
import { type User } from "./types/user";
import { type ThunkConfig } from "../../types/stateShema";
import { userActions } from "../user/userSlice";
import axios from "axios";

interface LoginByUsernameProps {
    email: string;
    password: string;
}

export const signUpByEmail = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>("auth/signup", async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    const { email, password } = authData;

    try {
        const response = await extra.api.post<User>(
            "http://localhost:3001/auth/signup",
            { email, password }
        );

        if (!response.data) {
            throw new Error();
        }
        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
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
