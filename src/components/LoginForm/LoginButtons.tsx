import React from "react";
import { User } from "../../store/slices/login/types/user";
import { ButtonWhite } from "../../styles/ui/buttons/buttons";

interface IProps {
    authData: User | undefined;
    logOut: () => void;
    login?: () => void;
}

const LoginButtons = ({ authData, logOut, login }: IProps) => {
    return (
        <>
            {authData?.token ? (
                <ButtonWhite onClick={logOut}>Log out</ButtonWhite>
            ) : (
                <ButtonWhite onClick={login}>login</ButtonWhite>
            )}
        </>
    );
};

export default LoginButtons;
