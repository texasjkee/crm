import React, { memo, useCallback } from "react";
import { ButtonWhite } from "../../styles/ui/buttons/buttons";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "routers/routerConfig";
import { User } from "store/slices/user/types";
import { authActions } from "store/slices/user/userSlice";
import { useDispatch } from "react-redux";
import { eventAction } from "store/slices/events/eventSlice";

interface IProps {
    authData: User | undefined;
}

const LoginButtons = memo(function LoginButtons({ authData }: IProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(authActions.logout());
        dispatch(eventAction.setAllEvents([]));
        navigate(RoutePath.auth);
    }, [dispatch, navigate]);

    return (
        <>
            {authData?.token ? (
                <ButtonWhite onClick={onLogout}>Log out</ButtonWhite>
            ) : (
                <ButtonWhite onClick={() => navigate(RoutePath.auth)}>
                    login
                </ButtonWhite>
            )}
        </>
    );
});

export default LoginButtons;
