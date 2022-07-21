import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import Transactions from './utils/transactions';

function filterJSONarray(array, key, value) {
    try {
        return array.filter(obj => obj[key] === value);
    }
    catch (err) {
        return [];
    }
}

class Fiat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            transactions: [],
        };
        reactAutobind(this)
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
        this.interval = null
    }

    sync() {
        var config = {
            method: 'get',
            url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/get-account-balance',
            headers: {
                'ewallet': this.props.ewallet,
            },
            cancelToken: this.source.token
        };
        this.axios(config)
            .then((response) => {
                const myArray = filterJSONarray(response.data.data.accounts, "currency", "USD")
                if (myArray.length > 0) {
                    this.setState({
                        balance: myArray[0].balance,
                    });
                }
                else {
                    console.log("No Balance");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        var config2 = {
            method: 'get',
            url: 'https://e9wzhv9k7d.execute-api.us-east-1.amazonaws.com/get-transactions-ewallet',
            headers: {
                'ewallet': this.props.ewallet,
            },
            cancelToken: this.source.token
        };
        this.axios(config2)
            .then((response) => {
                const myJSON = filterJSONarray(response.data.data, "currency", "USD")
                this.setState({
                    transactions: myJSON
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.sync()
        this.interval = setInterval(() => {
            this.sync()
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
                <div style={{
                    fontSize: '1.6rem',
                    padding: "10px"
                }}>
                    Fiat Wallet: {this.state.balance} USD
                </div>
                <hr />
                <div style={{
                    fontSize: '1.5rem',
                }}>
                    Transactions:
                </div>
                <div style={{
                    margin: "25px",
                    borderBottom: "solid #ddd 0px"
                }} />
                <Transactions transactions={this.state.transactions} />
            </div>
        );
    }
}

export default Fiat;