import { StateSchema } from "../../../types/stateShema";

export const getUserAuthData = (state: StateSchema) => state.user.authData;
