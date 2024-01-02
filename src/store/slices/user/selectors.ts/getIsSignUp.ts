import { StateSchema } from "../../../types/stateShema";

export const getIsSignUp = (state: StateSchema) => state.user.isSignUp;
