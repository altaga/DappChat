/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

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
            <img alt="subimage" onClick={toggle} src={props.nft.image} style={{ maxWidth: "80%", borderRadius: "10px" }} loading="lazy" />
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
                    <Row>
                        <Col xs="12" style={{
                            paddingBottom:"10px"
                        }}>
                            <Input
                                id="addressValueInit0128"
                                placeholder="Address"
                                value={to}
                                style={{
                                    width: "100%",
                                    border: "solid 1px #1b5eb5",
                                    background: "white",
                                    color: "black",
                                    fontSize: "1.5rem",
                                    textAlign: "center",
                                    alignContent: "start",
                                }}
                                onChange={(e) =>
                                    setTo(e.target.value)
                                }
                            />
                        </Col>
                        <Col xs="12">
                            <button
                                disabled={!(to.length === 42)}
                                style={{
                                    width: "100%",
                                    padding: "4px 14px 4px",
                                    fontSize: "1.5rem",
                                }}
                                className="myButton"
                                onClick={() => {
                                    transfer(to)
                                }} type="button">
                                Transfer
                            </button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalNFT;