import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "../../store/slices/user/selectors.ts/getAuthData";
import { styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NameForm from "./NameForm";

const ProfileComponent = () => {
    const authData = useSelector(getUserAuthData);
    const { name, email } = authData ?? {};

    const [isLock, setIsLock] = useState(false);
    return (
        <UserData>
            <Wrapper>
                <h5>Name:</h5>
                {isLock ? (
                    <NameForm authData={authData} />
                ) : (
                    <>
                        <h5>{name}</h5>
                        <Button onClick={() => setIsLock(!isLock)}>
                            <EditIcon />
                        </Button>
                    </>
                )}
            </Wrapper>
            <h5>Email:{email}</h5>
        </UserData>
    );
};

export default ProfileComponent;

const UserData = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    width: "300px",
});

const Wrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

const Button = styled("button")({
    marginLeft: "auto",
});
