import React from "react";
import { ButtonWhite } from "../../styles/ui/buttons/buttons";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "routers/routerConfig";
import { User } from "store/slices/user/types";

interface IProps {
    authData: User | undefined;
    logOut: () => void;
}

const LoginButtons = ({ authData, logOut }: IProps) => {
    const navigate = useNavigate();
    return (
        <>
            {authData?.token ? (
                <ButtonWhite onClick={logOut}>Log out</ButtonWhite>
            ) : (
                <ButtonWhite onClick={() => navigate(RoutePath.auth)}>
                    login
                </ButtonWhite>
            )}
        </>
    );
};

export default LoginButtons;
