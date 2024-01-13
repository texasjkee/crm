import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type LoginSchema } from "./types/loginSchema";
import { signUpByEmail } from "./signUpByEmail";

const initialState: LoginSchema = {
    isLoading: false,
    email: "",
    password: "",
    error: undefined,
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signUpByEmail.fulfilled, (state) => {
                state.isLoading = true;
                state.error = "pls, do login";
            })
            .addCase(signUpByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
