import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "../../store/slices/user/selectors.ts/getAuthData";
import ChangeForm from "./ChangeForm";

const ProfileData = () => {
    const authData = useSelector(getUserAuthData);
    const { email, name } = authData ?? {};
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isLockButton, setIsLockButton] = useState(true);
    const [handelChange, setHandelChange] = useState(" ");
    const buttonForm = () => {
        return isOpenForm ? setIsOpenForm(false) : setIsOpenForm(true);
    };
    useEffect(() => {
        if (handelChange.length > 3) {
            setIsLockButton(false);
        }
    }, [handelChange]);
    return (
        <>
            <Box
                width='1100px'
                height='200px'
                display='grid'
                gridTemplateColumns='repeat(2, 1fr)'
                border='1px solid'
                margin='0 auto'
                justifyContent='center'
                borderRadius='3px'
            >
                <h4>NAME:{name}</h4>
                <h4>EMAIL:{email}</h4>
                {isOpenForm && <ChangeForm setHandleChange={setHandelChange} />}
            </Box>
            <Box
                margin='10px auto'
                display='flex'
                gap='10px'
                justifyContent='center'
            >
                <Button variant='outlined' onClick={buttonForm}>
                    Change
                </Button>
                <Button
                    variant='contained'
                    color='success'
                    disabled={isLockButton}
                >
                    Send
                </Button>
            </Box>
        </>
    );
};

export default ProfileData;
