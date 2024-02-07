import React, { useState } from "react";
import styled from "@emotion/styled";
import LoginButtons from "../AuthForm/AuthButtons";
import AccountButtons from "../AccountBurger/AccountButtons";
import AccountBurger from "../AccountBurger/AccountBurger";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RoutePath } from "../../routers/routerConfig";
import useAuthStatus from "../../common/hooks/useAuthStatus";
import { eventAction } from "../../store/slices/events/eventSlice";
import { Typography } from "@mui/material";
import { authActions } from "store/slices/user/userSlice";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, authData } = useAuthStatus();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const onLogout = () => {
        dispatch(authActions.logout());
        dispatch(eventAction.setAllEvents([]));
        navigate(RoutePath.auth);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const burgerClose = () => {
        setAnchorEl(null);
    };

    console.log(isLoggedIn, "header rerender");
    return (
        <HeaderWrapper>
            <NavLink to={RoutePath.main}>
                <Typography color={"white"} variant='h5'>
                    CRM
                </Typography>
            </NavLink>
            <ControllerPanel>
                {isLoggedIn && (
                    <AccountButtons handleClick={handleClick} open={open} />
                )}
                <LoginButtons authData={authData} logOut={onLogout} />

                {open && (
                    <AccountBurger
                        anchorEl={anchorEl}
                        burgerClose={burgerClose}
                        open={open}
                    />
                )}
            </ControllerPanel>
        </HeaderWrapper>
    );
}

export default Header;

const HeaderWrapper = styled("div")`
    padding: 0 10px 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--purple);
`;
const ControllerPanel = styled("div")`
    display: flex;
`;
