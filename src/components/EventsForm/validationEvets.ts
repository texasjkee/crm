import * as Yup from "yup";
import { ObjectSchema } from "yup";
import { EventFormTypes } from "./types";

const errorMessages = {
    name: {
        required: "Name is required",
        invalid: "Invalid name",
    },
    dateTime: {
        required: "Time is required",
    },
    price: {
        required: "Price must be required",
        isNumber: "Price must be a number",
        isBigger: "Price must be a greater than 100",
    },
};

export const validationEvents: ObjectSchema<EventFormTypes> =
    Yup.object().shape({
        name: Yup.string()
            .matches(/^[A-Za-z ]*$/, "Please enter valid name")
            .max(40)
            .required(errorMessages.name.required),
        date: Yup.date().required(errorMessages.dateTime.required),
        price: Yup.number()
            .required()
            .typeError(errorMessages.price.isNumber)
            .test(
                "Is positive?",
                errorMessages.price.isBigger,
                (value) => value > 100
            )
            .required(errorMessages.price.required),
    });
