import { StateSchema } from "../../../types/stateSchema";

export const getLoginError = (state: StateSchema) => state?.user?.error ?? "";
