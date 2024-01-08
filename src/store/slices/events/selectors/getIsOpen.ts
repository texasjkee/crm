import { StateSchema } from "../../../types/stateSchema";

export const getIsopen = (state: StateSchema) => state.event.isOpen;
