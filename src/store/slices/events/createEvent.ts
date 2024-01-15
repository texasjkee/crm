import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "../../types/stateSchema";
import { isAxiosError } from "axios";
import { eventAction } from "./eventSlice";
import { EventTResponseType } from "./types";
import { URL } from "../../../api/api";

interface CreateEventProps {
    name: string;
    date: Date;
    price: number;
    isDone: boolean;
}

export const createEvent = createAsyncThunk<
    EventTResponseType,
    CreateEventProps,
    ThunkConfig<string>
>("event/create", async (createData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<EventTResponseType>(
            URL.CREATE_EVENTS,
            createData
        );
        if (!response.data) {
            throw new Error("Wrong with create event");
        }
        dispatch(eventAction.setEvent(response.data));
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            dispatch(eventAction.setError(error.response?.data.message));
        }
        console.error(error);
        return rejectWithValue("Wrong with create event");
    }
});
