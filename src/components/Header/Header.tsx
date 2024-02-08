import React, { useState } from "react";
import styled from "@emotion/styled";
import LoginButtons from "../AuthForm/AuthButtons";
import AccountButtons from "../AccountBurger/AccountButtons";
import AccountBurger from "../AccountBurger/AccountBurger";
import { NavLink } from "react-router-dom";
import { RoutePath } from "routers/routerConfig";
import useAuthStatus from "common/hooks/useAuthStatus";
import { Typography } from "@mui/material";

export const Header = function Header() {
    const { isLoggedIn, authData } = useAuthStatus();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const burgerClose = () => {
        setAnchorEl(null);
    };

    console.log("header rerender");
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
                <LoginButtons authData={authData} />

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
};

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
