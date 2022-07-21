/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ReactAudioPlayer from 'react-audio-player';

const ModalAudio = (props) => {
    const {
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div style={{ textAlign: "center" }}>
            <AudiotrackIcon
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
                    <ReactAudioPlayer
                        src={props.src}
                        controls
                        style={{
                            width: "100%"
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <button
                        style={{
                            fontSize: "1.2rem",
                            padding: "4px 14px 2px"
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

export default ModalAudio;