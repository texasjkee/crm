import styled from "@emotion/styled";
import { Suspense, useCallback, useState } from "react";
import MUIModal, { ModalSize } from "../../styles/ui/MUIModal/MUIModal";
import { FormType } from "../LoginForm/LoginForm";
import { LoginFormAsync } from "../LoginForm/LoginFormAsync";

function Header() {
    const [isOpen, setIsopen] = useState(false);
    const onSubmit = (values: FormType) => {
        console.log(values);
    };
    const onCloseModal = useCallback(() => {
        setIsopen(false);
    }, []);

    return (
        <HeaderWrapper>
            <h1>CRM</h1>
            <button onClick={() => setIsopen(true)}>Login</button>
            {isOpen && (
                <MUIModal
                    lazy
                    width={ModalSize.SMALL}
                    isOpen={isOpen}
                    onClose={onCloseModal}
                >
                    <Suspense fallback={""}>
                        <LoginFormAsync handleSubmit={onSubmit} singUp />
                    </Suspense>
                </MUIModal>
            )}
        </HeaderWrapper>
    );
}

export default Header;

const HeaderWrapper = styled("div")`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--yellow);
`;
