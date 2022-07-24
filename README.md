# DappChat

![Logo](https://i.ibb.co/TBKwbSD/logo.png)

DappChat is a Decentralized chat application with document transfer capabilities and NFT services, while providing TradFi conveniences.

# Watch our demo video:

[![Image](https://i.ibb.co/j3DCtPZ/image.png)](PENDING!)

# Test the product:

## URL: https://dappchat-deploy-6a5nkr.spheron.app/

Instructions here: https://github.com/altaga/DappChat#how-it-works

# Introduction and Problem Statement:

Messaging systems and apps such as whatsapp, telegram, wechat, facebook messenger and so many others have become ubiquitous nowadays. And not only that, but businesses and individuals have become partially dependent on these and we trust them because of the number of people that use them. With more than 3.6 billion people worldwide and over 145 billion messages being sent every day. 

<img src="https://assets-global.website-files.com/5e42772e6a8cfd42a9715206/609a4d9ba39eb4aaa1308844_growth-of-messaging-apps-2016.jpeg">

This has brought forth stratospheric market valuations.

WhatsApp was acquired for $19 billion in 2014, Telegram has over 500 million users and rejected an investment offer at $30 billion. Skype was sold to Microsoft for $8.5 billion in 2011. And they will continue growing at a rate of 10% per year by 2030.

But there's a huge privacy problem in regards to siloed enterprises controlling data. These are regarding several right’s violations mainly around privacy such as Data sharing violations like the fine of 266 million euros that Whattsapp received by the EU in September last year, Telegram’s constant issues with cyber theft mainly around bank accounts and quite a large number of cases of Blackmail. And private data leaks such as the one that happened through facebook in April 2021.

<img src="http://cdn.statcdn.com/Infographic/images/normal/25691.jpeg">

Nevertheless, messaging companies are still operating under practices that suggest data governance has not been solved.

Data is the most valuable resource an individual has and through blockchain technology this privacy issue can be quenched. We think that the way to launch a competitor is through the DeFi ecosystem as it is growing at an incredible rate and Serum is one of the premium platforms for that.

Having said that we decided to build it with the following characteristics:

 - Fully on-chain encrypted chat app,
 - Directly integrated with Polygon scan and built on Polygon.
 - Moralis managing everything from the backend for a faster implementation.
 - Will allow MATIC and MATIC-based token transfer between chatters!

# Our Solution:

DappChat is a Decentralized chat application with document transfer capabilities and NFT services, while providing TradFi conveniences.

## Diagram:

![Image](https://i.ibb.co/wJKf9PG/scheme-drawio.png)

### Tech we Use:

- Filecoin:
    - ChainSafe:
      - Upload the files to IPFS on the same reference folder.
      - Get files uploaded to IPFS by folder.
    - NFT.Storage:
      - Through the NFT.Storage API we upload the files and metadata to IPFS. We then mined the NFT on the Polygon network.
    - IPFS Gateways:
      - We use public IPFS Gateways to obtain our files, the gateways used are.
          - https://ipfs.io/ipfs/
          - https://cf-ipfs.com/ipfs/
          - https://cloudflare-ipfs.com/ipfs/
          - https://gateway.pinata.cloud/ipfs/
          - https://gateway.ipfs.io/ipfs/
- Polygon Network:
  - Interaction with chat contract to send messages.
    - Chat Contract Address: [0x7edf4BDFD63a5A98475f6831b9e42176aa21d509](https://mumbai.polygonscan.com/address/0x7edf4BDFD63a5A98475f6831b9e42176aa21d509).
    - Chat SmartContract: https://github.com/altaga/DappChat/blob/main/Contract/Chat.sol
  - Mandar Matic token
  - Deploy NFT Contract and Mint NFT.
    - NFT SmartContract: https://github.com/altaga/DappChat/blob/main/Contract/NFT-Token.sol
  - The datafeeds in our app are directly from Chainlink's price data feeds.
    - Chainlink Docs: https://data.chain.link/polygon/mainnet
    - Price Datafeed SmartContract: https://github.com/altaga/DappChat/blob/main/Contract/PriceConsumerV3.sol
- Valist:
  - We have our version of the software documentation released with Valist.
    - Valist URL: https://app.valist.io/altaga/dappchat
- Spheron:
  - We make use of your Deployment service for production.
    - Spheron URL: https://dappchat-deploy-6a5nkr.spheron.app/
- Covalent:
  - Obtaining account balances.
  - We get the contracts from the NFTs.

# How it's built:

## Filecoin and IPFS:

![Filecoin](https://i.ibb.co/gSd7vfk/Fil.png)![IPFS](https://i.ibb.co/sRbWQWj/Image.png)

Filecoin Judging Criteria:

![Judging](https://i.ibb.co/55z9zxp/image.png)

Filecoin and IPFS are the core of our project since almost every part of it works thanks to a product made by the Filecoin community.

- Ventana de chat:

![Chat](https://i.ibb.co/3kpXRhH/image.png)

Being able to send files from our chat window is possible thanks to the Chainsafe service (https://chainsafe.io/), since with its API's we can upload the files to IPFS directly, previously associating them to a folder, which in this case is the same address (this in order to save us the use of the database), and after this send the CID of the content to the recipient.

    async uploadFile(address) {
        return new Promise((resolve, reject) => {
            var myData = new FormData();
            myData.append('file', this.state.file, this.state.file.name);
            myData.append('path', `${address}`);
            var config = {
                method: 'post',
                url: 'https://api.chainsafe.io/api/v1/bucket/BUCKET/upload',
                headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': 'Bearer XXXXXXXXXXXXTOKENXXXXXXXXXX'
            },
            data: myData
        };
        axios(config)
            .then((res) => resolve("Ok"))
            .catch((error) => {
            reject("Error")
            });
        })
    }

In turn, we can easily obtain the list of files uploaded by this user thanks to its listing API.

    getFiles(address) {
        var data = JSON.stringify({
            "path": address.toLowerCase()
        });
        var config = {
            method: 'post',
            url: 'https://api.chainsafe.io/api/v1/bucket/BUCKET/ls',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer XXXXXXXXXXXXTOKENXXXXXXXXXX'
            },
            data: data
        };
        axios(config)
            .then((res) => this.setState({ files: res.data }))
            .catch((error) => { console.log(error) });
    }

- Explorer:

In the case of the explorer, the use of Chainsafe is essential, since with this we can obtain the CID of the contents that we have uploaded to chainsafe from our chat and, in turn, the files that we have uploaded from the explorer.

![Explorer](https://i.ibb.co/XxFmZvq/image.png)

However, in this case the important part is that the files received by the chat will in turn be added to our explorer, being content that we have as shared, above all we will be able to see the Shared files according to the conversation that we have active in the chat, to a larger organization.

    async getSharedFiles(add1, add2) {
        let to = []
        let from = []
        try {
            to = await this.getFilesAsync(add1.toLowerCase())
        }
        catch {
            //nothing
        }
        try {
            from = await this.getFilesAsync(add2.toLowerCase())
        }
        catch {
            //nothing
        }
        let tofrom = [].concat(to, from)
        let chatCID = this.state.messageHistory.map((item) => htmlToCID(item.file))
        let temp = []
        for (let i = 0; i < tofrom.length; i++) {
            for (let j = 0; j < chatCID.length; j++) {
            if (tofrom[i].cid === chatCID[j]) {
                temp.push(tofrom[i])
            }
            }
        }
        this.setState({
            sharedFiles: removeDuplicates(temp)
        })
    }

- NFT Gallery:

All the gallery that we have in our project was completely made from our UI, since we already have the NFT.Storage API and the NFT Token smart contract integrated in the web page.

![NFT-Gallery](https://i.ibb.co/VY0rbRn/image.png)

In a simple way it is possible to create new NFTs on our platform, and even be able to create a complete collection from it, such as our limited edition Phanties.

    async NFTstorageStore() {
        return new Promise((resolve, reject) => {
            var data = new FormData();
            data.append('meta', `{"name": "${this.state.nameNFT}","description":"${this.state.descNFT}"}`);
            data.append('image', this.state.fileNFT, this.state.fileNFT.name);
            var config = {
                method: 'post',
                url: 'https://api.nft.storage/store',
                headers: {
                    'Authorization': 'Bearer XXXXXXXXXXXXTOKENXXXXXXXXXX',
                },
                data: data
            };

            axios(config)
            .then((response) => {
                this.setState({
                    cidNFT: response.data.value.url
                }, () => resolve(response.data.value.url))
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

## Polygon Network:

![Polygon](https://i.ibb.co/rwSJctk/matic-token.png)

The polygon network was used to deploy all the contracts, both the contracts of all the NFTs and the main chat contract, in this case it was designed for its speed and low fees, making it easily scalable to carry out an effective chat.

The chat contract allows us to attach any kind of text to our message, in our case we use the discord format to send the CID of the files and instructions about the messages.

![Message](https://i.ibb.co/dB9SJk2/image.png)

    Hi!:file:QmdF4hz6Z7fQ9qNSQJVHRxqHDSFjEEcDdshqK8RZZgW9EN:filef::type:image/png:typef:

With this format, we can separate the message from what interests us, the text and thus display it on the display.

    if (item.mess.indexOf(":req:") > -1) {
        delString1 = item.mess.substring(item.mess.indexOf(":req:"), item.mess.indexOf(":reqf:") + 6)
        req = parseFloat(delString1.replace(":req:", "").replace(":reqf:", ""))
    }
    if (item.mess.indexOf(":file:") > -1) {
        delString2 = item.mess.substring(item.mess.indexOf(":file:"), item.mess.indexOf(":filef:") + 7)
        file = IPFSgateway + delString2.replace(":file:", "").replace(":filef:", "")
        delString3 = item.mess.substring(item.mess.indexOf(":type:"), item.mess.indexOf(":typef:") + 7)
        type = delString3.replace(":type:", "").replace(":typef:", "")
    }

- Chat Contract Address: [0x7edf4BDFD63a5A98475f6831b9e42176aa21d509](https://mumbai.polygonscan.com/address/0x7edf4BDFD63a5A98475f6831b9e42176aa21d509).

- Chat SmartContract: https://github.com/altaga/DappChat/blob/main/Contract/Chat.sol

Finally, the prices feeds of our project are obtained with the following code and contract.

Code:
        
    async getPriceFeed() {
        try {
            let contract = new ethers.Contract(priceFeed, abi3(), providerMatic);
            let priceAVAX = await contract.getLatestAVAXPrice();
            .
            .
            .
            let priceXRP = await contract.getLatestXRPPrice();

            let prices = {
            avax: parseFloat((priceAVAX).toString()) / 100000000,
            .
            .
            .
            xrp: parseFloat((priceXRP).toString()) / 100000000,
            }
            this.setState({
            prices: [
                epsilonRound(prices.avax),
                .
                .
                .
                epsilonRound(prices.xrp),
            ],
            })
        }
        catch {
            // nothing
        }
    }

Contract Price Feeds: https://github.com/altaga/DappChat/blob/main/Contract/PriceConsumerV3.sol

## Valist: 

Thanks to valist we have a more secure way to distribute our code in a decentralized way and at the same time be able to keep track of the versions of our code.

![Valist](Imagen faltante hasta finalizar el repo)

In this case during development we reached version 1.0.4

NOTE: The version of Valist does not support HTML tags like <img> so the images in your post must be in the format that uses: []()

URL: https://app.valist.io/altaga/dappchat

## Spheron:

Thanks to Sphere On we were also able to decentralize the deployment and hosting process of our application, we can also do the build and deploy process just by uploading the source code in reactjs.

![Spheron](https://i.ibb.co/4MtGNdq/image.png)

URL: https://dappchat-deploy-6a5nkr.spheron.app/

NOTE: In the case of a ReactJS application, you must make an application with conditional rendering WITHOUT ROUTING, because when trying to do routing on the page it will try to access an IPFS route that will not have content and will give you an error.

![Spheron-error](https://i.ibb.co/28Xmw8v/image.png)

## Covalent:

Our application by requiring that we quickly look up the initial balance of our Wallet and in turn if it has NFT's in it, we were able to find a way to do it efficiently from the Covalent API's.

Get Balance:

    async function getMaticBalance(address) {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api.covalenthq.com/v1/80001/address/${address}/balances_v2/?key=ckey_XXXXXXXXXXXXXXXXXXXXXXX`,
            headers: {}
        };
        axios(config)
        .then((response) => {
            for (let i = 0; i < response.data.data.items.length; i++) {
                if (response.data.data.items[i].contract_ticker_symbol === "MATIC") {
                    resolve(response.data.data.items[i].balance)
                }
            }
            resolve(0)
        })
        .catch((error) => {
            console.log(error);
            reject(error)
        });
    })
    }

Get NFT's:

    async syncNFT(address) {
        let contractsNFT = []
        let temp = await axios({
            method: 'get',
            url: `https://api.covalenthq.com/v1/80001/address/${address}/balances_v2/?key=ckey_XXXXXXXXXXXXXXXXXXXXXXX&format=JSON&nft=true&no-nft-fetch=false`,
            headers: {
                'Accept': 'application/json'
            }
        })
        temp = temp.data.data.items.filter(item => item.type === "nft");
        temp = temp.map(item => {
            return ({
                contractAddress: item.contract_address
            })
        })
        temp.forEach((item) => {
            if (item.contractAddress !== "") {
                contractsNFT.push(new ethers.Contract(item.contractAddress, abi2(), this.provider.getSigner()));
            }
        })
        let res = []
        for (let i = 0; i < contractsNFT.length; i++) {
            try {
                temp = await contractsNFT[i].tokenURI("0");
                temp = await fetch(ipfsTohtml(temp))
                temp = await temp.json()
                temp.image = ipfsTohtml2(temp.image ? temp.image : temp.file)
                temp.contract = contractsNFT[i]
                res.push(temp)
            }
            catch {
                // nothing
            }
        }
            if (this.state.nft.length !== res.length) {
                this.setState({
                    nft: res
                })
            }
    }

# How it works:

Use Polygon Matic Testnet on Metamask Wallet!!!!

- Get it on: https://metamask.io/

- Follow: https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/

Needless to say, you need a friend to test or two browsers with two Polygon Addresses with Metamask.

