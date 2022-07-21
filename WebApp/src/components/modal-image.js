/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ModalImage = (props) => {
    const {
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div style={{ textAlign: "center" }}>
            <img alt="subimage" onClick={toggle} src={props.src} style={{ maxHeight: "100px", borderRadius: "10px" }} loading="lazy" />
            <Modal ref={React.createRef()} isOpen={modal} toggle={toggle} className={className} size="lg">
                <ModalHeader>
                    {
                        props.name
                    }
                </ModalHeader>
                <ModalBody style={{
                    textAlign: "center",
                }}>
                    <img src={props.src} alt={"myimagealt"} style={{ maxHeight: "900px", maxWidth: "600px", height: "100%", width: "100%", borderRadius: "10px" }} />
                </ModalBody>
                <ModalFooter>
                    <button
                        style={{
                            fontSize: "1.2rem",
                            padding:"4px 14px 2px"
                        }}
                        className="myButton"
                        onClick={() => {
                            window.open(props.src, "_blank")
                        }} type="button">
                        Download
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalImage;