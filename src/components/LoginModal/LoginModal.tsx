import { Suspense, memo } from "react";
import { LoginFormAsync } from "../LoginForm/LoginFormFormAsync";
import { Modal, ModalSize } from "../common/ui/Modal/Modal";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

const LoginModal = memo(function LoginModal(props: IProps) {
    const { isOpen, onClose, title } = props;
    return (
        <Modal
            title={title}
            width={ModalSize.SMALL}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Suspense fallback={""}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
});

export default LoginModal;
