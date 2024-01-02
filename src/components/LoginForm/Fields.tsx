import React from "react";
import { FieldErrors, UseFormReturn, useFieldArray } from "react-hook-form";
import { FormType } from "./LoginForm";
import { TextField } from "@mui/material";

type PickedTypes = Pick<UseFormReturn, "control" | "register" | "watch">;

interface FieldsProps extends UseFormReturn<PickedTypes> {
    errors: FieldErrors<FormType>;
}

export const Fields = (props: FieldsProps) => {
    const { control, register, watch, errors } = props;
    const { fields } = useFieldArray({
        control,
        name: "confirm",
    });
    console.log(fields, "fields");
    return (
        <>
            {fields.map((item, index) => {
                const checked = watch(`login.${index}.isConfirm`);

                return (
                    <div key={item.id}>
                        <TextField
                            label='Email'
                            fullWidth
                            error={Boolean(errors.email)}
                            helperText={errors.email && errors.email.message}
                            {...register(`login.${index}.email`)}
                        />
                        <TextField
                            fullWidth
                            label='Password'
                            type='password'
                            error={Boolean(errors.password)}
                            helperText={
                                errors.password && errors.password.message
                            }
                            {...register(`login.${index}.password`)}
                        />
                        {checked && (
                            <TextField
                                label='Confirm password'
                                fullWidth
                                error={Boolean(errors.confirmPassword)}
                                helperText={
                                    errors.confirmPassword &&
                                    errors.confirmPassword.message
                                }
                                {...register(`login.${index}.confirmPassword`)}
                            />
                        )}
                    </div>
                );
            })}
        </>
    );
};
