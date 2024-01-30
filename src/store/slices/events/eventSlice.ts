import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventSchema, EventType } from "./types";
import { EventSchema, EventType } from "./types";
import { createEvent } from "./createEvent";
import { getAllEvents } from "./getAllEvents";
import { getAllEvents } from "./getAllEvents";

const initialState: EventSchema = {
    id: "",
    selectedDay: null,
    name: "",
    dateTime: "",
    isDone: false,
    price: 200,
    isOpen: false,
    error: "",
    isLoading: false,
    events: [],
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setEvent: (state, action: PayloadAction<EventType>) => {
            state.events.push(action.payload);
        },
        setAllEvents: (state, action: PayloadAction<EventType[]>) => {
            state.events = [...action.payload];
        },
        setAllEvents: (state, action: PayloadAction<EventType[]>) => {
            state.events = [...action.payload];
        },
        setSelectedDay: (state, action: PayloadAction<string>) => {
            state.selectedDay = action.payload;
            state.isOpen = true;
        },
        setCloseModal: (state) => {
            state.isOpen = false;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createEvent.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.events.push(action.payload);
        });
        builder.addCase(createEvent.rejected, (state, action) => {
            state.error = action.payload;
        });
        builder.addCase(getAllEvents.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
            action.payload && state.events.push(action.payload);
        });
        builder.addCase(getAllEvents.fulfilled, (state, action) => {
            state.events = [...action.payload];
        });
        builder.addCase(getAllEvents.rejected, (state, action) => {
            state.error = action.payload;
        });
        builder.addCase(getAllEvents.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
            action.payload && state.events.push(action.payload);
        });
        builder.addCase(getAllEvents.fulfilled, (state, action) => {
            state.events = [...action.payload];
        });
        builder.addCase(getAllEvents.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export const { actions: eventAction } = eventSlice;
export const { reducer: eventReducer } = eventSlice;
