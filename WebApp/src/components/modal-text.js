/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const ModalText = (props) => {
    const {
        className
    } = props;

    const [modal, setModal] = useState(false);
    const [data, setData] = useState("");

    const toggle = () => setModal(!modal);

    var axios = require('axios');

    var config = {
        method: 'get',
        url: `${props.src}`,
    };

    axios(config)
        .then((response) => {
            setData(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

    return (
        <div style={{ textAlign: "center" }}>
            <TextSnippetIcon
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
                    padding:"50px",
                    overflowY:"scroll",
                    height:"500px"
                }}>
                    {data}
                </ModalBody>
                <p/>
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

export default ModalText;