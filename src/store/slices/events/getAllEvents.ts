import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventType } from "./types";
import { ThunkConfig } from "store/types/stateSchema";
import { URL } from "api/api";

export const getAllEvents = createAsyncThunk<
    EventType[],
    null,
    ThunkConfig<string>
>("event/getAll", async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.get<EventType[]>(URL.GET_ALL_EVENTS);
        if (!response.data) {
            throw new Error("Wrong with get all events");
        }
        console.log(response.data, "data response");
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return rejectWithValue(error.response.data?.message);
    }
});
