import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Form } from "../LoginForm/LoginForm";
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
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { getError } from "../../store/slices/events/selectors/getError";
import WarnInfo from "../common/ui/Alert/WarnInfo";
import { SEVERITY } from "../common/const/enums";
import { UIContext } from "../UIContext";

export interface EventsFormProps {
    onSuccess: () => void;
}

const EventsForm = ({ onSuccess }: EventsFormProps) => {
    const resolver = useYupValidationResolver<EventFormTypes>(validationEvents);
    const dispatch = useDispatch<AppThunkDispatch>();
    const requestError = useSelector(getError);
    const { setAlert } = useContext(UIContext);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<EventFormTypes>({ resolver, defaultValues });

    const postEvent = async (values: EventFormTypes) => {
        const result = await dispatch(
            createEvent({ ...values, isDone: false })
        );

        if (result.meta.requestStatus === "fulfilled") {
            setAlert({
                show: true,
                message: "Event created",
                severity: "success",
            });
            onSuccess();
        }
    };

    const onSubmit: SubmitHandler<EventFormTypes> = (data) => postEvent(data);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label='Name'
                fullWidth
                error={Boolean(errors.name)}
                helperText={errors?.name?.message}
                {...register("name")}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                    control={control}
                    name='date'
                    render={({ field: { onChange } }) => (
                        <MobileDateTimePicker
                            {...register("date")}
                            sx={{ width: "100%" }}
                            // value={value}
                            onChange={onChange}
                        />
                    )}
                />
            </LocalizationProvider>
            <InputLabel htmlFor='standard-adornment-amount'>Price</InputLabel>
            <Input
                fullWidth
                error={Boolean(errors.price)}
                {...register("price")}
                startAdornment={
                    <InputAdornment position='start'>$</InputAdornment>
                }
            />
            {errors && <p>{errors?.price?.message}</p>}
            {requestError && (
                <WarnInfo severity={SEVERITY.ERROR}>{requestError}</WarnInfo>
            )}
            <Button
                color='secondary'
                variant='contained'
                fullWidth
                type='submit'
            >
                Save
            </Button>
        </Form>
    );
};

export default EventsForm;
