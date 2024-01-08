import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ThunkConfig } from "../../types/stateSchema";
import axios from "axios";
import { eventAction } from "./eventSlice";
import { EventTResponseType } from "./types";

interface createEventProps {
    name: string;
    date: Date;
    price: number;
    isDone: boolean;
    authorId: number;
}

export const createEvent = createAsyncThunk<
    EventTResponseType,
    createEventProps,
    ThunkConfig<string>
>("event/create", async (createData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    const authorId = localStorage.getItem("user");
    console.log(authorId, "authorid");

    try {
        const response = await extra.api.post<EventTResponseType>(
            "http://localhost:3001/event/create",
            { ...createData, authorId: createData.authorId }
        );

        console.log(response.data, "response data");
        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(eventAction.setError(error.response?.data.message));
        }
        console.error(error);
        return rejectWithValue("Wrong with create event");
    }
});
