import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import { Card, CardBody, CardHeader, Col, Input, Row } from 'reactstrap';
import logo from '../../assets/logo.png'
import ContextModule from '../../utils/contextModule';
import history from "../../utils/history";
import { ethers } from 'ethers';
import { withCookies } from "react-cookie";

let provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/XXXXXXXXXXXXXXXXXXXXXXX")

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            error: null,
            user: "",
            password: "",
            loading: false,
        };
        reactAutobind(this);
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
    }

    static contextType = ContextModule;

    componentDidMount() {

    }

    componentWillUnmount() {
        this.source.cancel("Component got unmounted");
    }

    login() {
        const { cookies } = this.props;
        this.setState({ loading: true });
        let config = {
            method: 'get',
            url: '	https://8y4q1js31m.execute-api.us-east-1.amazonaws.com/DappChatLogin',
            headers: {
                'user': this.state.user,
                'pass': this.state.password
            },
            cancelToken: this.source.token
        };
        this.axios(config)
            .then(async (response) => {
                if (response.data === "Error") {
                    console.log("Error");
                    this.setState({ loading: false });
                }
                else {
                    config = {
                        method: 'get',
                        url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/get-account-balance',
                        headers: {
                            'ewallet': response.data
                        },
                        cancelToken: this.source.token
                    };
                    this.axios(config)
                        .then(async (response) => {
                            
                            this.setState({ loading: false });
                            cookies.set('wallet', response.data.data.metadata.signature, { path: '/main/' });
                            cookies.set('ewallet', response.data.data.id, { path: '/main/' });
                            window.open("/main/","_self")
                        })
                        .catch((error) => {
                            this.setState({ loading: false });
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                this.setState({ loading: false });
                console.log(error);
            });
    }

    render() {
        return (
            <div className='VerticalandHorizontal'>
                <img src={logo} alt="logo" className="logo" style={{
                    height: '200px',
                    paddingBottom: '20px'
                }} />
                <Card style={{
                    width: '80vw',
                    borderColor: '#1b5eb5',
                }}>
                    <CardHeader style={{
                        backgroundColor: '#1b5eb5',
                        color: 'white',
                    }}>
                        <h3>Login to DappChat</h3>
                    </CardHeader>
                    <CardBody>
                        <Input
                            style={{
                                border: '2px solid #1b5eb5',
                            }}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={this.state.user}
                            onChange={(e) => this.setState({ user: e.target.value })}
                        />
                        <div style={{ margin: "10px" }} />
                        <Input
                            style={{
                                border: '2px solid #1b5eb5',
                            }}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                        />
                        <div style={{ margin: "15px" }} />
                        <Row>
                            <Col>
                                <button
                                    disabled={this.state.loading}
                                    className='roundButton'
                                    style={{
                                        width: "100%",
                                    }}
                                    onClick={() => {
                                        this.login()
                                    }
                                    }>
                                    Login
                                </button>
                            </Col>
                            <Col>
                                <button className='roundButton' style={{ width: "100%" }}>
                                    Register
                                </button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withCookies(Login);