import * as Yup from "yup";
import { ObjectSchema } from "yup";
import { ProfileFormTypes } from "./types/index";

const errorMessages = {
    name: {
        required: "Name is required",
    },
};

export const validationProfile: ObjectSchema<ProfileFormTypes> =
    Yup.object().shape({
        name: Yup.string()
            .min(2)
            .max(120)
            .required(errorMessages.name.required),
    });
