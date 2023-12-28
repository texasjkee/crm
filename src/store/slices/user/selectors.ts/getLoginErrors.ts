import { StateSchema } from "../../../types/stateShema";

export const getLoginError = (state: StateSchema) => state?.user?.error ?? "";
