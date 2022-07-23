# DappChat

![Logo](https://i.ibb.co/TBKwbSD/logo.png)

DappChat is a Decentralized chat application with document transfer capabilities and NFT services, while providing TradFi conveniences.

# Watch our demo video:

[![Image](https://i.ibb.co/j3DCtPZ/image.png)](PENDING!)

# Test the product:

## URL: https://dappchat-deploy-6a5nkr.spheron.app/

Instructions here: https://github.com/altaga/DappChat#how-it-works

# Introduction and Problem Statement:

DOK

# Our Solution:

DappChat is a Decentralized chat application with document transfer capabilities and NFT services, while providing TradFi conveniences.

## Diagram:

![Image](https://i.ibb.co/wJKf9PG/scheme-drawio.png)

- Filecoin:
    - ChainSafe:
      - Subir los archivos a IPFS sobre una misma carpeta de refrencia.
      - Obtener los archivos subidos a IPFS por carpeta.
    - NFT.Storage:
      - A travez de la API de NFT.Storage subimos los archivos y metadata a IPFS. Posteriomente mintamos el NFT en la red de Polygon.
    - IPFS Gateways:
      - Utilizamos Gateways de IPFS publicos para obtener nuestros archivos, los gateways utilizados son.
          - https://ipfs.io/ipfs/
          - https://cf-ipfs.com/ipfs/
          - https://cloudflare-ipfs.com/ipfs/
          - https://gateway.pinata.cloud/ipfs/
          - https://gateway.ipfs.io/ipfs/
- Polygon Network:
  - Interaccion con contrato de chat para mandar mensajes.
    - Chat Contract Address: [0x7edf4BDFD63a5A98475f6831b9e42176aa21d509](https://mumbai.polygonscan.com/address/0x7edf4BDFD63a5A98475f6831b9e42176aa21d509).
    - Chat SmartContract: https://github.com/altaga/DappChat/blob/main/Contract/Chat.sol
  - Mandar Matic token
  - Deploy NFT Contract and Mint NFT.
    - NFT SmartContract: https://github.com/altaga/DappChat/blob/main/Contract/NFT-Token.sol
  - Los datafeeds de nuestra aplicacion son directamente de los price data feeds de Chainlink.
    - Chainlink Docs: https://data.chain.link/polygon/mainnet
    - Price Datafeed SmartContract: https://github.com/altaga/DappChat/blob/main/Contract/PriceConsumerV3.sol
- Valist:
  - Tenemos nuestra version del software publicada con Valist.
    - Valist URL: https://app.valist.io/altaga/dappchat
- Spheron:
  - Hacemos uso de su servicio de Deployment para produccion.
    - Spheron URL: https://dappchat-deploy-6a5nkr.spheron.app/
- Covalent:
  - Obtencion de los balances de la cuenta.
  - Obtenemos los contratos de los NFT.

# How it's built:

## Filecoin and IPFS:

![Filecoin](https://i.ibb.co/gSd7vfk/Fil.png)![IPFS](https://i.ibb.co/sRbWQWj/Image.png)

Filecoin e IPFS son el core de nuestro proyecto ya que casi cada parte del mismo funciona gracias a un producto realizado por la comunidad de Filecoin.

- Ventana de chat:

![Chat](https://i.ibb.co/3kpXRhH/image.png)

El poder mandar archivos desde nuestra ventana de chat es posible gracias a el servicio de Chainsafe (https://chainsafe.io/), ya que con sus API's podemos subir los archivos a IPFS directamente asociandolos previamente a un folder, que en este caso es la misma address (esto con el fin de podernos ahorrar el uso de base de datos), y posterior a esto mandar el CID del contenido a el destinatario.

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

A su vez podemos obtener facilmente la lista de los archivos subidos por este usuario gracias a su API de listado.

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

En el caso del explorer es fundamental el uso de Chainsafe, ya que con esto podemos obtener los CID de los contenidos que hemos subido a chainsafe desde nuestro chat y a su vez los archivos que hayamos subido desde el explorer.

![Explorer](https://i.ibb.co/XxFmZvq/image.png)

Sin embargo en este caso la parte importante es que los archivos recibidos por el chat a su vez seran agregados a nuestro explorer, siendo contenido que tenemos como shared, sobre todo podremos ver los archivos Shared segun la conversacion que tengamos activa en el chat, para una mayor organizacion.

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

Toda la galeria que tenemos en nuestro proyecto fue totalmente realizada desde nuestra UI, ya que tenemos ya en la pagina web integrada la API de NFT.Storage y el smart contract de los NFT Token.

![NFT-Gallery](https://i.ibb.co/VY0rbRn/image.png)

De forma sencilla es posible crear nuevos NFT sobre nuestra plataforma, e incluso poder crear una coleccion completa desde la misma, como lo son nuestros Phanties edicion limitada.

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

La red de polygon se utilizo para deslplegar todos los contratos, tanto los contratos de todos los NFT como el contrato principal del chat, en este caso fue pensado por su velocidad y bajas fees, haciendo facilmente escalable el poder realizar un chat eficaz.

El contrato del chat nos permite adjuntar cualquier clase de texto a nuestro mensaje, en nuestro caso utilizamos el formato de discord para mandar los a CID de los archivos e intrucciones sobre los mensajes.

![Message](https://i.ibb.co/dB9SJk2/image.png)

    Hi!:file:QmdF4hz6Z7fQ9qNSQJVHRxqHDSFjEEcDdshqK8RZZgW9EN:filef::type:image/png:typef:

Con este formato, podemos separar el mensaje de lo que nos interesa sel texto y asi desplegarlo en el visualizador.

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

Por ultimo las prices feeds de nuestro proyecto las obtenemos con el siguiente codigo y contrato.

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

Gracias a valist tenemos una forma mas segura de distribuir nuestro codigo de forma decentralizada y a su vez poder llevar un control de las versiones de nuestro codigo.

![Valist](Imagen faltante hasta finalizar el repo)

En este caso durante el desarrollo llegamos a la version 1.0.4

NOTA: La version de Valist no soporta las etiquetas HTML como <img> entonces las imaganes en tu publicacion debe de ser en formato []()

URL: https://app.valist.io/altaga/dappchat

## Spheron:

Gracias a Sphereron pudimos decentralizar tambien el proceso de deployment y hosting de nuestra aplicacion, ademas podemos hacer proceso de build y deploy con solo subir el codigo fuente en reactjs.

![Spheron](https://i.ibb.co/4MtGNdq/image.png)

URL: https://dappchat-deploy-6a5nkr.spheron.app/

NOTA: En el caso de una aplicacion de ReactJS deberas de hacer una aplicacion con renderizado condicional SIN ROUTING, debido a que al momento de intentar hacer rounting en la pagina esta intentara acceder a una ruta de IPFS que no tendra contenido y te dara error.

![Spheron-error](https://i.ibb.co/28Xmw8v/image.png)

## Covalent:

Nuestra aplicacion al requerir que rapidamente se busque el balance inicial de nuestra Wallet y a su vez si esta tiene NFT's en ella, pudimos encontrar una forma de hacerlo eficazmente desde las API's de Covalent.

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

