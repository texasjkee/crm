import { Button, TextField } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Form } from "../LoginForm/LoginForm";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { defaultValues } from "./initValuesForm";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { EventFormTypes } from "./types";
import { useYupValidationResolver } from "../common/hooks/useYupValidationResolver";
import { validationEvents } from "./validationEvets";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../store/store";
import { createEvent } from "../../store/slices/events/createEvent";
import { getUserId } from "../../store/slices/events/selectors/getUserId";

export interface EventsFormProps {
    onSuccess: () => void;
}

const EventsForm = ({ onSuccess }: EventsFormProps) => {
    const resolver = useYupValidationResolver<EventFormTypes>(validationEvents);
    const dispatch = useDispatch<AppThunkDispatch>();
    const userId = useSelector(getUserId);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<EventFormTypes>({ resolver, defaultValues });

    const onSubmit: SubmitHandler<EventFormTypes> = (data) => {
        if (userId)
            dispatch(createEvent({ ...data, authorId: userId, isDone: false }));
    };

    console.log(onSuccess);
    console.log("Events form rendered");

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label='Name'
                fullWidth
                error={Boolean(errors.name)}
                helperText={errors.name && errors.name.message}
                {...register("name")}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                    control={control}
                    name='date'
                    render={({ field: { onChange, value } }) => (
                        <MobileTimePicker
                            {...register("date")}
                            sx={{ width: "100%" }}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                <InputLabel htmlFor='standard-adornment-amount'>
                    Price
                </InputLabel>
                <Input
                    fullWidth
                    error={Boolean(errors.price)}
                    {...register("price")}
                    startAdornment={
                        <InputAdornment position='start'>$</InputAdornment>
                    }
                />
                {errors && <p>{errors.price && errors.price.message}</p>}
            </LocalizationProvider>
            <Button color='primary' variant='contained' fullWidth type='submit'>
                Save
            </Button>
        </Form>
    );
};

export default EventsForm;
