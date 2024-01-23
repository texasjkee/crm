import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export interface DefaultProps {
    setHandleChange: (value: string) => void;
}

export interface ChangeData {
    name: string;
}
export const defaultValues = {
    name: " ",
};

const ChangeForm = ({ setHandleChange }: DefaultProps) => {
    const { register, handleSubmit } = useForm<ChangeData>({ defaultValues });

    const onSubmit: SubmitHandler<ChangeData> = (data) => {
        console.log(data);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHandleChange(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                size='small'
                id='outlined-basic'
                label='Outlined'
                variant='outlined'
                {...(register("name"), { onChange: handleChange })}
            />
        </form>
    );
};

export default ChangeForm;
