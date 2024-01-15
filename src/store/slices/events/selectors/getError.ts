import { StateSchema } from "../../../types/stateSchema";

export const getError = (state: StateSchema) => state.event.error;
