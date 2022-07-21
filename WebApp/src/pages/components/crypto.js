import React, { Component } from 'react';
import Ctransactions from './utils/cryptotransactions';
import { networks } from "./utils/networks";

function epsilonRound(num) {
    const zeros = 6;
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            account: "",
            provider: "",
            transactions: []
        };
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
        this.interval = null
    }

    async componentDidMount() {
        let transactions = await networks[80001].getTransactions(this.props.address);
        this.setState({ transactions: transactions });
        this.interval = setInterval(async () => {
            let transactions = await networks[80001].getTransactions(this.props.address);
            this.setState({ transactions: transactions });
        }, 10000);
    }

    componentWillUnmount() {
        this.source.cancel("Component got unmounted");
        clearInterval(this.interval)
    }

    render() {
        return (
            <div style={{
                height: '100vh',
                fontSize: '1.2em',
                paddingBottom: '10px',
                textAlign: "center",
            }}>
                <div>
                    <a
                        href={`https://mumbai.polygonscan.com/address/${this.props.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {this.props.address}
                    </a>
                </div>
                <p />
                <div
                    style={{
                        fontSize: '1.3em',
                    }}>
                    Network :
                    <span style={{
                        color: networks[80001].color
                    }}>
                        {" "}{networks[80001].name}
                    </span>
                </div>
                <p />
                <div style={{
                    fontSize: "1.5rem"
                }}>
                    Balance:{" "} {epsilonRound(this.props.balance)}{" "} &nbsp;
                    {
                        networks[80001].icon && <img src={networks[80001].icon} alt="icon" width="30px"></img>
                    }
                </div>
                <p />
                <hr />
                <div style={{ paddingBottom: "10px" }}>
                    Transactions:
                </div>
                <Ctransactions transactions={this.state.transactions} />
            </div>
        );
    }
}

export default Crypto;