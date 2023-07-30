import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { useState, Fragment } from "react";
import { ArticleView } from "./ArticleView";
const ModalView = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(state => !state);
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-sm btn-default" onClick={toggle}>Preview</button>
            <Modal show={modal} onHide={toggle}>
                <ModalHeader closeButton>Article Preview</ModalHeader>
                <ModalBody>
                    <ArticleView article={props.article} />
                </ModalBody>
            </Modal>
        </Fragment>
    )
};

export { ModalView };
