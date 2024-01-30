import { TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";
import styled from "@emotion/styled";
import { useYupValidationResolver } from "../common/hooks/useYupValidationResolver";
import { validationProfile } from "./validationProfile";
import { ProfileFormTypes } from "./types/";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../../store/store";
import { changeUserName } from "../../store/slices/profile/changeName";

export const defaultValues = {
    name: "",
};

export interface FormType {
    name: string;
    email: string;
}

const NameForm = () => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const resolver = useYupValidationResolver<FormType>(validationProfile);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>({
        resolver,
        defaultValues,
    });
    const changeName = async (values: ProfileFormTypes) => {
        const result = await dispatch(changeUserName(values));
        console.log(result);
    };

    const onSubmit: SubmitHandler<ProfileFormTypes> = (data) =>
        changeName(data);
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                size='small'
                label='Name'
                error={Boolean(errors.name)}
                helperText={errors?.name?.message}
                {...register("name")}
            />
            <button type='submit'>
                <CheckIcon color='success' />
            </button>
        </Form>
    );
};

export default NameForm;

const Form = styled("form")({
    display: "flex",
    alignItems: "center",
});
