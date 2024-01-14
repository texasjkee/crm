import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../routers/routerConfig";

interface IProps {
    anchorEl: HTMLElement | null;
    handleClose: () => void;
    open: boolean;
}

const AccountBurger = ({ anchorEl, handleClose, open }: IProps) => {
    return (
        <div>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                onClose={handleClose}
                open={open}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <NavLink to={AppRoutes.PROFILE}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                </NavLink>
                <MenuItem onClick={handleClose}>My Event</MenuItem>
                <MenuItem onClick={handleClose}>Time: 01.01.2024</MenuItem>
            </Menu>
        </div>
    );
};

export default AccountBurger;
