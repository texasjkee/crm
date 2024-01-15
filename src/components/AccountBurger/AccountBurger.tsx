import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { RoutePath } from "../../routers/routerConfig";

interface IProps {
    anchorEl: HTMLElement | null;
    burgerClose: () => void;
    open: boolean;
}

const AccountBurger = ({ anchorEl, burgerClose, open }: IProps) => {
    return (
        <div>
            <Menu
                anchorEl={anchorEl}
                onClose={burgerClose}
                open={open}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <NavLink to={RoutePath.profile}>
                    <MenuItem onClick={burgerClose}>Profile</MenuItem>
                </NavLink>
                <MenuItem onClick={burgerClose}>My Event</MenuItem>
            </Menu>
        </div>
    );
};

export default AccountBurger;
