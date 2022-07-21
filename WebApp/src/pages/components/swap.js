import React, { Component } from 'react';
import { Input} from 'reactstrap';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import reactAutobind from 'react-autobind';
import { networks } from './utils/networks';
import { ethers } from "ethers"

function epsilonRound(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Swap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            up: 0,
            down: 0,
            account: '',
            balance: 0,
            fiatBalance: 0,
            provider: {
                symbol: 'Matic',
            },
            price: 0,
            flag: false,
            loading: false,
        }
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
        reactAutobind(this);
        this._isMounted = true;
    }

    async componentDidMount() {
        this._isMounted && this.setState({
            price: await networks[80001].getPrice(),
        })
    }

    componentWillUnmount() {
        this.source.cancel("Component got unmounted");
        this._isMounted = false;
    }

    async Crypto2Fiat() {
        this._isMounted && this.setState({
            loading: true,
        })
        this.axios({
            method: 'get',
            url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/transfer',
            headers: {
                'ewallets': "ewallet_d02b0876cf85ffe5ed92ab3cbdbc725a",
                'ewalletd': this.props.ewallet,
                'amount': epsilonRound(this.state.down).toString(),
                'currency': "USD"
            },
            cancelToken: this.source.token
        })
            .then((response) => {
                this.axios({
                    method: 'get',
                    url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/transaction-decide',
                    headers: {
                        'id': response.data.data.id,
                        'status': 'accept'
                    },
                    cancelToken: this.source.token
                })
                    .then(async () => {
                        const Web3 = require('web3');
                        let provider = new ethers.providers.Web3Provider(window.ethereum);
                        const web3 = new Web3(window.ethereum);
                        const params = [{
                            from: this.props.address,
                            to: '0xcF2F7040801cfA272D68CD37c8FD7D9fb84D65D8',
                            value: ethers.utils.parseEther(this.state.up.toString()).toHexString()
                        }];
                        const transactionHash = await provider.send('eth_sendTransaction', params)
                        let transactionReceipt = null
                        while (transactionReceipt == null) {
                            transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
                            await sleep(1000)
                        }
                        this._isMounted && this.setState({
                            loading: false,
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async Fiat2Crypto() {
        console.log("Fiat2Crypto")
        this._isMounted && this.setState({
            loading: true,
        })
        this.axios({
            method: 'get',
            url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/transfer',
            headers: {
                'ewallets': this.props.ewallet,
                'ewalletd': "ewallet_d02b0876cf85ffe5ed92ab3cbdbc725a",
                'amount': this.state.up.toString(),
                'currency': "USD"
            },
            cancelToken: this.source.token
        })
            .then((response) => {
                this.axios({
                    method: 'get',
                    url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/transaction-decide',
                    headers: {
                        'id': response.data.data.id,
                        'status': 'accept'
                    },
                    cancelToken: this.source.token
                })
                    .then(() => {
                        this.axios({
                            method: 'get',
                            url: 'https://t1478tt4h5.execute-api.us-east-1.amazonaws.com/send',
                            headers: {
                                'flag': '1',
                                'to': this.props.address,
                                'amount': this.state.down,
                            },
                            cancelToken: this.source.token
                        })
                            .then((response) => {
                                this._isMounted && this.setState({
                                    loading: false,
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async transaction() {
        if (this.state.flag) {
            this.Crypto2Fiat();
        }
        else {
            this.Fiat2Crypto();
        }
    }

    render() {
        return (
            <div style={{
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Input
                    type="number"
                    name="number"
                    id="number"
                    value={this.state.up ? this.state.up : ""}
                    placeholder={"From " + (this.state.flag ? this.state.provider.symbol + "" : "USD")}
                    style={{
                        width: '80%',
                        height: '50px',
                        borderRadius: '25px',
                        border: '2px solid #1b5eb5',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'black',
                        marginTop: '10px',
                        marginBottom: '10px',
                        textAlign: 'center',
                    }}
                    onChange={(e) => {
                        if (this.state.flag) {
                            this._isMounted && this.setState({
                                up: e.target.value,
                                down: e.target.value * this.state.price,
                            })
                        }
                        else {
                            this._isMounted && this.setState({
                                up: e.target.value,
                                down: e.target.value / this.state.price,
                            })
                        }
                    }}
                />
                <button className='roundButton' style={{ fontWeight: "bolder", height: "5vh" }} onClick={() => this._isMounted && this.setState({
                    up: this.state.down,
                    down: this.state.up,
                    flag: !this.state.flag
                })}>
                    <SwapVertIcon />
                </button>
                <Input
                    value={this.state.down ? this.state.down : ""}
                    type="number"
                    name="number"
                    id="number"
                    disabled
                    placeholder={"To " + (!this.state.flag ? this.state.provider.symbol : "USD")}
                    style={{
                        width: '80%',
                        height: '50px',
                        borderRadius: '25px',
                        border: '2px solid #1b5eb5',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'black',
                        marginTop: '10px',
                        marginBottom: '10px',
                        textAlign: 'center',
                    }}
                />
                <br />
                <button
                    disabled={this.state.loading}
                    className='roundButton' style={{ fontWeight: "bolder", fontSize: "1.5rem", height: "7vh" }} onClick={() => {
                        this.transaction();
                    }}>
                    {
                        this.state.loading ?
                            "Swapping..." :
                            "Swap"
                    }
                </button>
            </div>
        );
    }
}

export default Swap;