import { createSlice } from "@reduxjs/toolkit";
import { type ProfileSchema } from "./types";
import { changeProfile } from "./chengeProfile";

const initialState: ProfileSchema = {
    profileData: { name: "", surname: "" },
    error: undefined,
    isLoading: false,
};

export const authSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changeProfile.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(changeProfile.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changeProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: profileActions, reducer: profileReducer } = authSlice;
