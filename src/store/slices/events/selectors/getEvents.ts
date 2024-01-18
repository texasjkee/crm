import { StateSchema } from "../../../types/stateSchema";

export const getEvents = (state: StateSchema) => state.event.events;
