import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type User, type UserSchema } from "../login/types/user";
import { USER_LOCAL_STORAGE_KEY } from "../../../components/common/const/localStorage";

const initialState: UserSchema = {
    authData: { name: "1", email: "1", token: "1" },
    error: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUpdateName: (state, action: PayloadAction<string>) => {
            state.authData && (state.authData.name = action.payload);
        },
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
