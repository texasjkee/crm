import * as Yup from "yup";
import { ObjectSchema, boolean } from "yup";
import { FormType } from "./LoginForm";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const validationSchema: ObjectSchema<FormType> = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .matches(passwordRules, {
            message: "Please create a stronger password",
        })
        .required("Required"),
    isConfirm: boolean().required(),
    confirmPassword: Yup.string()
        .when("isConfirm", {
            is: true,
            then: (schema) =>
                schema.required("Confirm password must be required"),
        })
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Required"),
});
