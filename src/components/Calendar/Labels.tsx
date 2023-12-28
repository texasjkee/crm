import React, { memo } from "react";
import styled from "@emotion/styled";
import { ReactComponent as LineIcon } from "../../assets/svg/horizontalLine.svg";
import { css } from "@emotion/react";
import { ReactComponent as DeleteIcon } from "../../assets/svg/delete.svg";

interface LabelsProps {
    colors: string[];
    deleteHandler?: (color: string) => void;
}

const Labels = memo(function Labels({ colors, deleteHandler }: LabelsProps) {
    const onDelete = (color: string) => {
        deleteHandler && deleteHandler(color);
    };
    return (
        <StyledLabels>
            {colors.map((item, index) => (
                <div
                    css={css`
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    `}
                    key={index}
                >
                    {!!deleteHandler && (
                        <DeleteButton
                            onClick={() => {
                                onDelete(item);
                            }}
                        />
                    )}
                    <LineIcon
                        css={css`
                            fill: ${item};
                        `}
                    />
                </div>
            ))}
        </StyledLabels>
    );
});

export default Labels;

const StyledLabels = styled.div`
    display: flex;
    gap: 0 5px;
`;
const DeleteButton = styled(DeleteIcon)`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-bottom: 5px;
    transition: transform 0.2s ease-in-out;

    &:hover,
    &:focus {
        transform: scale(1.1);
    }

    &:focus {
        outline: none;
    }
`;
