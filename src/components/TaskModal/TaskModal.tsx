import React, { type ChangeEvent, type FormEvent, useState } from "react";
import FormControl from "@mui/material/FormControl";
import styled from "@emotion/styled";
import { Button, TextareaAutosize, css } from "@mui/material";
import Compact from "react-color/lib/components/compact/Compact";
import { type ColorResult } from "react-color";
import Labels from "../Calendar/Labels";
import { type TaskType } from "../Calendar/Calendar";
import Modal, { ModalSize } from "../common/ui/Modal/Modal";

export interface TaskModalProps {
    isOpen: boolean;
    onClose?: () => void;
    holdTask: (values: Pick<TaskType, "priority" | "title">) => void;
}

const TaskModal = ({ isOpen, onClose, holdTask }: TaskModalProps) => {
    const [colors, setColor] = useState<string[]>([]);
    const [task, setTask] = useState<string>("");

    const handleOnChange = React.useCallback((color: ColorResult) => {
        setColor((prev) => [...prev, color.hex]);
    }, []);

    const deleteHandler = React.useCallback(
        (color: string) => {
            const filteredColors = colors.filter((item) => item !== color);
            setColor(filteredColors);
        },
        [colors]
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        holdTask({ priority: colors, title: task });
        onClose && onClose();
    };

    const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTask(e?.currentTarget.value);
    };

    return (
        <Modal
            title={"Add task"}
            width={ModalSize.MEDIUM}
            isOpen={isOpen}
            onClose={onClose}
        >
            <TaskForm onSubmit={handleSubmit}>
                <FormControl>
                    <h1>Priority</h1>
                    {colors.length > 5 ? (
                        <Span>To much seleted colors</Span>
                    ) : (
                        <div>
                            <Compact
                                color={colors[colors.length - 1]}
                                onChange={handleOnChange}
                            />
                        </div>
                    )}
                    <LabelWrapper>
                        <Labels colors={colors} deleteHandler={deleteHandler} />
                    </LabelWrapper>
                    <TextArea
                        value={task}
                        onChange={onChangeTextArea}
                        minRows={3}
                        placeholder='Write a task'
                    />
                    <div css={buttonWrapper}>
                        <Button
                            disabled={task.length === 0}
                            type='submit'
                            variant='outlined'
                        >
                            Save
                        </Button>
                    </div>
                </FormControl>
            </TaskForm>
        </Modal>
    );
};

export default TaskModal;
const TaskForm = styled.form`
    display: flex;
    flex-direction: column;
    div,
    h1,
    span {
        margin-bottom: 10px;
    }
    TextArea {
        margin-bottom: 10px;
    }
`;
const TextArea = styled(TextareaAutosize)`
    border: 2px solid var(--dark-grey);
    padding: 10px;
`;
const LabelWrapper = styled.div`
    display: flex;
    gap: 5px;
`;
const buttonWrapper = css`
    display: flex;
    justify-content: end;
`;
const Span = styled.span`
    color: red;
`;
