import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "../../types/stateSchema";
import { isAxiosError } from "axios";
import { userActions } from "./userSlice";

import { URL } from "../../../api/api";

interface ChangeNameProps {
    name: string;
}

interface ChangeNameType {
    name: string;
}

export const createEvent = createAsyncThunk<
    ChangeNameType,
    ChangeNameProps,
    ThunkConfig<string>
>("user/create", async (createData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<ChangeNameType>(
            URL.CHANGE_NAME,
            createData
        );
        if (!response.data) {
            throw new Error("Wrong with create event");
        }
        dispatch(userActions.setUpdateName(response.data));
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            dispatch(eventAction.setError(error.response?.data.message));
        }
        console.error(error);
        return rejectWithValue("Wrong with create event");
    }
});
