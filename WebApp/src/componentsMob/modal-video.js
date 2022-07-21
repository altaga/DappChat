/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import TheatersIcon from '@mui/icons-material/Theaters';
import { Player, BigPlayButton } from 'video-react';

const ModalVideo = (props) => {
    const {
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div style={{ textAlign: "center" }}>
            <TheatersIcon
                onClick={toggle}
                style={{
                    fontSize: "6rem"
                }} />
            <Modal ref={React.createRef()} isOpen={modal} toggle={toggle} className={className} size="lg">
                <ModalHeader>
                    {
                        props.name
                    }
                </ModalHeader>
                <ModalBody style={{
                    textAlign: "center",
                }}>
                    <Player src={props.src} >
                        <BigPlayButton position="center" />
                    </Player>
                </ModalBody>
                <ModalFooter>
                    <button
                        style={{
                            fontSize: "1.2rem",
                            padding:"4px 14px 2px",
                            width: "100%"
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

export default ModalVideo;