import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "../../types/stateSchema";
import { EventType } from "./types";
import { URL } from "../../../api/api";
import { eventAction } from "./eventSlice";

export const getAllEvents = createAsyncThunk<
    EventType[],
    void,
    ThunkConfig<string>
>("event/getAll", async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<EventType[]>(URL.GET_ALL_EVENTS);
        if (!response.data) {
            dispatch(eventAction.setError("Wrong with create event"));
            throw new Error("Wrong with create event");
        }
        console.log(response.data, "data response");
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return rejectWithValue(error.response.data?.message);
    }
});
