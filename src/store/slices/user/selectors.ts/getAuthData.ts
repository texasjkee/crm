import { StateSchema } from "../../../types/stateSchema";

export const getUserAuthData = (state: StateSchema) => state.auth.authData;
