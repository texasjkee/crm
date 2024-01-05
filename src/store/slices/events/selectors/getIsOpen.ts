import { StateSchema } from "../../../types/stateShema";

export const getIsopen = (state: StateSchema) => state.event.isOpen;
