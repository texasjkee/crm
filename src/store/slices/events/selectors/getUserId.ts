import { StateSchema } from "../../../types/stateSchema";

export const getUserId = (state: StateSchema) => state.user.authData?.id;
