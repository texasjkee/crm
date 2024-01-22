import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "../../types/stateSchema";
import { EventType } from "./types";
import { URL } from "../../../api/api";

interface CreateEventProps {
    name: string;
    date: Date;
    price: number;
    isDone: boolean;
}

export const createEvent = createAsyncThunk<
    EventType,
    CreateEventProps,
    ThunkConfig<string>
>("event/create", async (createData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.post<EventType>(
            URL.CREATE_EVENTS,
            createData
        );
        if (!response.data) {
            throw new Error("Wrong with create event");
        }
        return response.data;
    } catch (error: unknown) {
        console.error(error);
        return rejectWithValue("Wrong with create event");
    }
});
