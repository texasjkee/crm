import { StateSchema } from "../../../types/stateSchema";

export const getUserAuthData = (state: StateSchema) => state.user.authData;
