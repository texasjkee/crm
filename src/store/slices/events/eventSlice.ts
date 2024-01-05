import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventSchema } from "./types";

const initialState: EventSchema = {
    id: "",
    selectedDay: null,
    name: "",
    dateTime: "",
    isDone: false,
    price: 200,
    isOpen: false,
    error: "",
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        // setEvent: (state, action: PayloadAction<string>) => {
        //     // state = action.payload;
        // },
        setSelectedDay: (state, action: PayloadAction<string>) => {
            state.selectedDay = action.payload;
            state.isOpen = true;
        },
        setCloseModal: (state) => {
            state.isOpen = false;
        },
    },
    extraReducers: (builder) => {
        console.log(builder, "builder");
        // builder.addCase(signUpByEmail.pending, (state) => {
        //     state.error = undefined;
        //     state.isLoading = true;
        // });
    },
});

export const { actions: eventAction } = eventSlice;
export const { reducer: eventnReducer } = eventSlice;
