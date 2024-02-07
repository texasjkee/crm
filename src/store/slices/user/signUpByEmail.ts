import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./types";
import { URL } from "api/api";
import { ThunkConfig } from "store/types/stateSchema";

interface SignUpProps {
    name?: string;
    email: string;
    password: string;
}

export const signUpByEmail = createAsyncThunk<
    User,
    SignUpProps,
    ThunkConfig<string>
>("auth/signup", async (authData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<User>(URL.REGISTRATION, authData);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return rejectWithValue(error.response.data.message);
    }
});
