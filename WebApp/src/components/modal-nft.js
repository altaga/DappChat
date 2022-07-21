/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ModalNFT = (props) => {
    const {
        className
    } = props;

    const [modal, setModal] = useState(false);
    const [to, setTo] = useState("")

    const toggle = () => setModal(!modal);

    const transfer = async (to) => {
        const transaction = await props.nft.contract.transferFrom(props.address, to, "0")
        await transaction.wait();
        document.getElementById("addressValueInit0128").value = ""
        toggle()
    }

    return (
        <div style={{ textAlign: "center" }}>
            <img alt="subimage" onClick={toggle} src={props.nft.image} style={{ maxHeight: "100px", borderRadius: "10px" }} loading="lazy" />
            <Modal ref={React.createRef()} isOpen={modal} toggle={toggle} className={className} size="lg">
                <ModalHeader>
                    {
                        props.nft.name
                    }
                </ModalHeader>
                <ModalBody style={{
                    textAlign: "center",
                }}>
                    <img src={props.nft.image} alt={"myimagealt"} style={{ maxHeight: "900px", maxWidth: "600px", height: "100%", width: "100%", borderRadius: "10px" }} />
                </ModalBody>
                <ModalBody
                    style={{
                        textAlign: "center",
                    }}
                >
                    <span
                        style={{
                            fontSize: "1.5rem"
                        }}
                    >
                        {
                            "Description: " + props.nft.description
                        }
                    </span>
                </ModalBody>
                <ModalFooter>
                    <Input
                        id="addressValueInit0128"
                        placeholder="Address"
                        value={to}
                        style={{
                            width: "70%",
                            border: "solid 1px #1b5eb5",
                            background: "white",
                            color: "black",
                            fontSize: "1.5rem",
                            textAlign: "center",
                            alignContent: "start"
                        }}
                        onChange={(e) =>
                            setTo(e.target.value)
                        }
                    />
                    <button
                        disabled={!(to.length === 42)}
                        style={{
                            padding: "4px 14px 4px",
                            fontSize: "1.5rem",
                        }}
                        className="myButton"
                        onClick={() => {
                            transfer(to)
                        }} type="button">
                        Transfer
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalNFT;