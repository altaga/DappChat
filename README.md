# DappChat

![Image](https://i.ibb.co/TBKwbSD/logo.png)

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

- Polygon Network:
  - Interaccion con contrato de chat para mandar mensajes.
    - Chat Contract Address: [0x7edf4BDFD63a5A98475f6831b9e42176aa21d509](https://mumbai.polygonscan.com/address/0x7edf4BDFD63a5A98475f6831b9e42176aa21d509).
    - Chat SmartContract: https://github.com/altaga/DappChat/blob/main/Contract/Chat.sol
  - Mandar Matic token
  - Deploy NFT Contract and Mint NFT.
    - NFT SmartContract: https://github.com/altaga/DappChat/blob/main/Contract/NFT-Token.sol
  - Los datafeeds de nuestra aplicacion son directamente de los price data feeds de Chainlink.
    - https://data.chain.link/polygon/mainnet
- Valist:
  - Tenemos nuestra version del software publicada con Valist.
    - Valist URL: https://app.valist.io/altaga/dappchat
- Sphereon:
  - Hacemos uso de su servicio de Deployment para produccion.
    - Sphereon URL: https://dappchat-deploy-6a5nkr.spheron.app/
- Covalent:
  - Obtencion de los balances de la cuenta.
  - Obtenemos los contratos de los NFT.
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

# How it built:

Polygon Network

![Polygon](https://i.ibb.co/rwSJctk/matic-token.png)

La red de polygon se utilizo para deslplegar todos los contratos, tanto los contratos de todos los NFT como el contrato principal del chat, en este caso fue pensado por su velocidad y bajas fees, haciendo facilmente escalable el poder realizar un chat eficaz.



# How it works:

Use Polygon Matic Testnet on Metamask Wallet!!!!

- Get it on: https://metamask.io/

- Follow: https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/

Needless to say, you need a friend to test or two browsers with two Polygon Addresses with Metamask.

