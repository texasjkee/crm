import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { getUserAuthData } from "../store/slices/user/selectors.ts/getAuthData";

export interface FormType {
    name?: string;
    email?: string;
}

export const Profile = () => {
    const [isLockName, setIsLockName] = useState(true);
    const [isLockEmail, setIsLockEmail] = useState(true);

    const userData = useSelector(getUserAuthData);

    const unLockInputName = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        isLockName ? setIsLockName(false) : setIsLockName(true);
    };

    const unLockInputEmail = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        isLockEmail ? setIsLockEmail(false) : setIsLockEmail(true);
    };

    return (
        <Box
            component='form'
            sx={{
                "& .MuiTextField-root": {
                    m: 1,
                    width: "25ch",
                },
            }}
            noValidate
            autoComplete='off'
        >
            <Stack
                spacing={{ xs: 1, sm: 1 }}
                direction='row'
                useFlexGap
                flexWrap='wrap'
                display='grid'
                gridTemplateColumns='25ch 30px'
                marginLeft='30px'
            >
                <TextField
                    disabled={isLockName}
                    id='outlined-required'
                    label='Name'
                    defaultValue={userData?.name}
                />
                <button onClick={(e) => unLockInputName(e)}>
                    <EditIcon />
                </button>

                <TextField
                    disabled={isLockEmail}
                    id='outlined-required'
                    label='email'
                    defaultValue={userData?.email}
                />
                <button onClick={(e) => unLockInputEmail(e)}>
                    <EditIcon />
                </button>
            </Stack>
        </Box>
    );
};
