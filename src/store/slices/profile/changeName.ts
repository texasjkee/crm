import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "../../types/stateSchema";
import { Name } from "./types";
import { URL } from "../../../api/api";

interface ChangeNameProps {
    name: string;
}

export const changeUserName = createAsyncThunk<
    Name,
    ChangeNameProps,
    ThunkConfig<string>
>("profile/change", async (changeData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.patch<Name>(
            URL.CHANGE_NAME,
            changeData
        );
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data.message);
    }
});
