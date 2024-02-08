import styled from "@emotion/styled";
import { Week } from "components/Calendar/Week.tsx/Week";
import React from "react";

export const WeekPage = () => {
    return (
        <Container>
            <Week />
        </Container>
    );
};
export const Container = styled.div`
    width: 98%;
    margin: auto;
    border-radius: 10px;
    margin-top: 15px;
`;
