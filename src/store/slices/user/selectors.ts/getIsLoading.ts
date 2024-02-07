import { StateSchema } from "../../../types/stateSchema";

export const getIsLoading = (state: StateSchema) => state.auth.isLoading;
