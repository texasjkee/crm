import * as yup from "yup";
import { useCallback } from "react";

export const useYupValidationResolver = <T>(
    validationSchema: yup.AnyObjectSchema
) =>
    useCallback(
        async (data: T) => {
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
