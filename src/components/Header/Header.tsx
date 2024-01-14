import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import LoginButtons from "../LoginForm/LoginButtons";
import AccountButtons from "../AccountBurger/AccountButtons";
import AccountBurger from "../AccountBurger/AccountBurger";
import { getUserAuthData } from "../../store/slices/user/selectors.ts/getAuthData";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "../LoginModal/LoginModal";
import { userActions } from "../../store/slices/user/userSlice";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../routers/routerConfig";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const onCloseModal = () => {
        setIsOpen(false);
        dispatch(userActions.setError(""));
    };

    const onShowModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onLogout = () => {
        dispatch(userActions.logout());
    };

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
                <h1>CRM</h1>
            </NavLink>
            <ControllerPanel>
                <AccountButtons
                    authData={authData}
                    handleClick={handleClick}
                    open={open}
                />
                <LoginButtons
                    login={onShowModal}
                    authData={authData}
                    logOut={onLogout}
                />

                {isOpen && (
                    <LoginModal
                        title={"Enter"}
                        isOpen={isOpen}
                        onClose={onCloseModal}
                    />
                )}
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
    background: var(--yellow);
`;
const ControllerPanel = styled("div")`
    display: flex;
`;
