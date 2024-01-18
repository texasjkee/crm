import { createAsyncThunk } from "@reduxjs/toolkit";
import { userActions, userSlice } from "./userSlice";
import axios from "axios";
import { URL } from "../../../api/api";
import { User } from "../login/types/user";
import { type ThunkConfig } from "../../types/stateSchema";
interface UpdateNameUserProps {
    name: string;
    email?: string
}

export const updateNameUser = createAsyncThunk<
    User, 
    UpdateNameUserProps, 
    ThunkConfig<string>
    >("user/update", async (userData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    const {name, email} = userData
    try {
        const response = await extra.api.post<User>(URL.UPDATE_NAME, {
            name,
            email, 
        })

        if(!response.data){
            throw new Error()
        }
        dispatch(userActions.updateName(response.data))

        return response.data
    } catch (error) {
        return rejectWithValue ("Something went wrong")
    }
})