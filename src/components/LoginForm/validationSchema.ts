import * as Yup from "yup";
import { ObjectSchema, boolean } from "yup";
import { FormType } from "./LoginForm";

const passwordRules = /^(?=.*\d)(?=.*[A-Z]).{5,}$/;

const errorMessages = {
    email: {
        required: "Email is required",
        invalid: "Invalid email",
    },
    password: {
        required: "Password is required",
        weak: "Please create a stronger password",
    },
    confirmPassword: {
        required: "Confirm password must be required",
        mismatch: "Your passwords do not match",
    },
};

export const validationSchema: ObjectSchema<FormType> = Yup.object().shape({
    email: Yup.string()
        .email(errorMessages.email.invalid)
        .required(errorMessages.email.required),
    password: Yup.string()
        .required(errorMessages.password.required)
        .when("isConfirm", {
            is: (value: boolean) => value,
            then: (schema) =>
                schema.matches(passwordRules, {
                    message: errorMessages.password.weak,
                }),
            otherwise: () => Yup.string(),
        }),
    isConfirm: boolean().required(),
    confirmPassword: Yup.string().when("isConfirm", {
        is: (value: boolean) => value,
        then: (schema) =>
            schema
                .required(errorMessages.confirmPassword.required)
                .oneOf(
                    [Yup.ref("password")],
                    errorMessages.confirmPassword.mismatch
                ),
        otherwise: () => Yup.string(),
    }),
});
