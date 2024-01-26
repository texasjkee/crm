import { css } from "@emotion/react";
import styled from "@emotion/styled";
// import { Reorder } from "framer-motion";

export const DaysContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
`;

export const Cell = styled.div`
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
    border-right: 1px solid rgba(166, 168, 179, 0.12);
    text-align: right;
    padding: 14px 20px;
    letter-spacing: 1px;
    font-size: 12px;
    box-sizing: border-box;
    color: #98a0a6;
    position: relative;
    pointer-events: none;
    z-index: 1;

    &.disabled {
        color: rgba(152, 160, 166, 0.6);
        background-color: #ffffff;
        background-image: url(./assets/svg/disabled.svg)
        cursor: not-allowed;
    }

    &.selected {
        background-color: var(--grey);
    }
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
`;

export const arrowUpStyle = css`
    display: inline-block;
    transform: rotate(90deg);
`;
export const arrowDownStyle = css`
    display: inline-block;
    transform: rotate(90deg);
`;
export const ButtonContainer = styled("div")`
    padding: 10px;
    display: flex;
    gap: 5px;
`;
export const WeekContainer = styled("div")`
    text-align: center;
`;

export const DayContainer = styled("div")`
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
    border-right: 1px solid rgba(166, 168, 179, 0.12);
    text-align: right;
     padding:0 5px ;
    letter-spacing: 1px;
    font-size: 12px;
    box-sizing: border-box;
    color: #98a0a6;
    position: relative;
    z-index: 1;
    overflow-x: auto;
    flex:1;  

    &:nth-of-type(7n + 7) {
        border-right: 0;
    }

    &:nth-of-type(n + 1):nth-of-type(-n + 7) {
        grid-row: 2;
    }

    &:nth-of-type(n + 8):nth-of-type(-n + 14) {
        grid-row: 3;
    }

    &:nth-of-type(n + 15):nth-of-type(-n + 21) {
        grid-row: 4;
    }

    &:nth-of-type(n + 22):nth-of-type(-n + 28) {
        grid-row: 5;
    }

    &:nth-of-type(n + 29):nth-of-type(-n + 35) {
        grid-row: 6;
    }

    &:nth-of-type(7n + 1) {
        grid-column: 1/1;
    }

    &:nth-of-type(7n + 2) {
        grid-column: 2/2;
    }

    &:nth-of-type(7n + 3) {
        grid-column: 3/3;
    }

    &:nth-of-type(7n + 4) {
        grid-column: 4/4;
    }

    &:nth-of-type(7n + 5) {
        grid-column: 5/5;
    }

    &:nth-of-type(7n + 6) {
        grid-column: 6/6;
    }
    &:nth-of-type(7n + 7) {
        grid-column: 7/7;
    }

    &.disabled {
        color: rgba(152, 160, 166, 0.6);
        background-color: var(--primary-dark-white);
        background-image: url(./assets/svg/disabled.svg)
        cursor: not-allowed;
    }

    &.selected {
        background-color: var(--grey);
    }
`;

export const daysName = css`
    font-size: 12px;
    text-transform: uppercase;
    color: #99a1a7;
    text-align: center;
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
    line-height: 50px;
    font-weight: 500;
`;
