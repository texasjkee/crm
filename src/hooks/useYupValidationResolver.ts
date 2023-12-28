import * as yup from "yup";
import { useCallback } from "react";
import { FormType } from "../components/LoginForm/LoginForm";

export const useYupValidationResolver = (
    validationSchema: yup.AnyObjectSchema
) =>
    useCallback(
        async (data: FormType) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                });

                return {
                    values,
                    errors: {},
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (errors: any) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (
                            allErrors: Record<
                                string,
                                { type: string; message: string }
                            >,
                            currentError: yup.ValidationError
                        ) => ({
                            ...allErrors,
                            [currentError.path as string]: {
                                type: currentError.type ?? "validation",
                                message: currentError.message,
                            },
                        }),
                        {}
                    ),
                };
            }
        },
        [validationSchema]
    );
