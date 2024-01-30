import React from "react";
import ProfileComponent from "../components/ProfileComponent/ProfileComponent";
import styled from "@emotion/styled";

export const Profile = () => {
    return (
        <Wrapper>
            <ProfileComponent />
        </Wrapper>
    );
};

const Wrapper = styled("div")({
    display: "flex",
    justifyContent: "center",
});
