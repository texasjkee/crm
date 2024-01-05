import { Suspense, memo } from "react";
import { Modal, ModalSize } from "../common/ui/Modal/Modal";
import { EventsFormAsync } from "../EventsForm/EventsFormAsync";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}
const title = "Add events";
const EventsModal = memo(function EventsModal(props: IProps) {
    const { isOpen, onClose } = props;
    console.log("Events modal rendered");

    return (
        <Modal
            title={title}
            width={ModalSize.SMALL}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Suspense fallback={""}>
                <EventsFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
});

export default EventsModal;
