import { StateSchema } from "../../../types/stateSchema";

export const getLoginError = (state: StateSchema) => state?.auth?.error ?? "";
