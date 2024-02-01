import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "../../types/stateSchema";
import { userActions } from "./userSlice";

import { URL } from "../../../api/api";

interface ChangeNameProps {
    name: string;
    email?: string;
    token?: string;
}

interface ChangeNameType {
    name: string;
}

export const changeNameUser = createAsyncThunk<
    ChangeNameType,
    ChangeNameProps,
    ThunkConfig<string>
>("profile/change", async (createData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<ChangeNameType>(
            URL.CHANGE_NAME,
            createData
        );
        if (!response.data) {
            throw new Error("wrong with change name");
        }
        dispatch(userActions.setUpdateName(response.data.name));
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return rejectWithValue(error.response?.data.message);
    }
});
