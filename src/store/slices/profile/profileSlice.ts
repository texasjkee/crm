import { createSlice } from "@reduxjs/toolkit";
import { changeUserName } from "./changeName";
import { Name } from "./types";
import { useDispatch } from "react-redux";
import { userActions } from "../user/userSlice";

const initialState: Name = {
    name: "",
};

// eslint-disable-next-line react-hooks/rules-of-hooks
const dispatch = useDispatch();

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(changeUserName.pending, (state) => {
            console.log(state);
        });
        builder.addCase(changeUserName.fulfilled, (state, action) => {
            dispatch(userActions.setUpdateName);
            state.name = action.payload && " "; //звернути увагу!
        });
    },
});
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
