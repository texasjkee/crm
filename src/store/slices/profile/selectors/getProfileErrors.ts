import { StateSchema } from "store/types/stateSchema";

export const getProfileError = (state: StateSchema) => state.profile.error;
