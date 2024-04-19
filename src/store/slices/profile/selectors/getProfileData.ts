import { StateSchema } from "store/types/stateSchema";

export const getProfileData = (state: StateSchema) => state.profile.profileData;
