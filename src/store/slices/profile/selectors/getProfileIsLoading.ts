import { StateSchema } from "store/types/stateSchema";

export const getProfileIsLoading = (state: StateSchema) =>
    state.profile.isLoading;
