import { StateSchema } from "../../../types/stateSchema";

export const getTokenData = (state: StateSchema) => state.user.authData?.token;
