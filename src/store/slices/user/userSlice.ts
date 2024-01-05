import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type User, type UserSchema } from "../login/types/user";
import { USER_LOCALSTORAGE_KEY } from "../../../components/common/const/localStorage";

const initialState: UserSchema = {
    authData: { id: null, email: "", accessToken: "" },
    error: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
