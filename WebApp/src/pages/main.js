// Basic imports
import "../assets/main.css";
import back from "../assets/back.png"

import React, { Component } from "react";
// Style and Html
import { Input, Row, Card, CardTitle, CardBody, CardFooter, Spinner, Col, CardHeader, Button, ButtonGroup } from "reactstrap";
// Utils
import autoBind from "react-autobind";
import { withCookies } from "react-cookie";
import { routerParams } from "../utils/params";
// Assets
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LinkIcon from "@mui/icons-material/Link";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logo from "../assets/flat.png";
import LogoN from "../assets/logo.png";
import githubLogo from "../assets/githubLogo.png";
import valistLogo from "../assets/valist.png";
// Side Menu
import MessageIcon from "@mui/icons-material/Message";
import FolderIcon from "@mui/icons-material/Folder";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// Wallet Menu icons
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import MoneyIcon from '@mui/icons-material/Money';
// File Explorer Icons
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import InfoIcon from '@mui/icons-material/Info';
// File Explorer Modals
import ModalImage from "../components/modal-image"
import ModalAudio from "../components/modal-audio"
import ModalText from "../components/modal-text"
import ModalVideo from "../components/modal-video"
// Wallet Accounts
import Crypto from './components/crypto';
import Fiat from './components/fiat';

// Swap 
import Swap from "./components/swap"

// Cashout

import Cash from "./components/cash"

// NFT 
import apebn from "../assets/nft-bn.png"
import apesel from "../assets/nft-sel.png"
import ModalNFT from "../components/modal-nft"

// Matic
//import MaticLogo from "../assets/matic-token.png";
// Crypto
import { abi } from "../contract/chatContract.js";
import { abi2, bytecode2 } from "../contract/nftContract.js";
import { abi3 } from "../contract/priceFeedContract.js";
import Modals from "../components/modal";
// Video Import
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css"; // import css
// Audio Import
import ReactAudioPlayer from "react-audio-player";
import axios from "axios"
import FormData from "form-data"
import { ethers } from "ethers"
// Price feeds
import avax from "../images/avax.png";
import bnb from "../images/bnb.png";
import btc from "../images/btc.png";
import dot from "../images/polkadot.png"
import eth from "../images/eth.png";
import fil from "../images/fil.png"
import link from "../images/link.png";
import matic from "../images/polygon.png";
import neo from "../images/neo.png"
import sol from "../images/sol.png";
import usdc from "../images/usdc.png";
import xrp from "../images/xrp.png"
import Tooltips from "../components/tooltip";
import Tooltips2 from "../components/tooltip2";
import Web3 from 'web3';


//const contractAddress = "0xF4aBfb397D67BabcaF7C3cC2edCf0d041bE32c38";
const contractAddress = "0x7edf4BDFD63a5A98475f6831b9e42176aa21d509";
const IPFSgateways = [
  "https://ipfs.io/ipfs/",
  "https://cf-ipfs.com/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
  "https://gateway.pinata.cloud/ipfs/",
  "https://gateway.ipfs.io/ipfs/"
]
const IPFSgateway = IPFSgateways[0]

// Price Feed
const providerMatic = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/");
const priceFeed = "0xFE006128fD276f29CDadd330f60be53B53285e8f"

const etherTable = {
  "wei": "1",
  "kwei": "1000",
  "mwei": "1000000",
  "gwei": "1000000000",
  "szabo": "1000000000000",
  "finney": "1000000000000000",
  "ether": "1000000000000000000",
  "kether": "1000000000000000000000",
  "grand": "1000000000000000000000",
  "mether": "1000000000000000000000000",
  "gether": "1000000000000000000000000000",
  "tether": "1000000000000000000000000000000"
}

// General functions

function epsilonRound(num) {
  const zeros = 2;
  return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

function ipfsTohtml(uri) {
  let substring = uri.substring(0, uri.lastIndexOf('/')).replace("ipfs://", 'https://')
  let substring2 = uri.substring(uri.lastIndexOf('/'), uri.length).replace("/", '.ipfs.dweb.link/')
  return substring + substring2
}

function ipfsTohtml2(uri) {
  return uri.replace("ipfs://", IPFSgateway)
}

function htmlToCID(uri) {
  return uri.replace(IPFSgateway, "")
}

function fileSearch(jsonArray, key, value) {
  for (let index = 0; index < jsonArray.length; index++) {
    if (jsonArray[index][key] === value) {
      return jsonArray[index]["cid"]
    }
  }
  return false
}

function detectFileType(url) {
  let fileType = url.split("/")[1]
  if (fileType === "pdf") {
    return "pdf"
  } else if (fileType === "txt") {
    return "txt"
  } else if (fileType === "mp4" || fileType === "avi" || fileType === "mov" || fileType === "mkv" || fileType === "wmv" || fileType === "mpg" || fileType === "3gp" || fileType === "m4v" || fileType === "flv" || fileType === "f4v" || fileType === "m4p" || fileType === "m4v" || fileType === "m4a" || fileType === "m4b" || fileType === "m4r" || fileType === "m4s") {
    return "video"
  } else if (fileType === "mp3" || fileType === "mpeg" || fileType === "wav" || fileType === "ogg" || fileType === "aac" || fileType === "wma" || fileType === "m4a" || fileType === "m4b" || fileType === "m4r" || fileType === "m4s") {
    return "audio"
  } else if (fileType === "png" || fileType === "jpg" || fileType === "jpeg" || fileType === "gif" || fileType === "bmp" || fileType === "webp") {
    return "image"
  }
  else {
    return "other"
  }
}

function detectFileTypeExplorer(url) {
  let fileType = url.split(".")[1]
  if (fileType === "pdf") {
    return "pdf"
  } else if (fileType === "txt") {
    return "txt"
  } else if (fileType === "mp4" || fileType === "avi" || fileType === "mov" || fileType === "mkv" || fileType === "wmv" || fileType === "mpg" || fileType === "3gp" || fileType === "m4v" || fileType === "flv" || fileType === "f4v" || fileType === "m4p" || fileType === "m4v" || fileType === "m4a" || fileType === "m4b" || fileType === "m4r" || fileType === "m4s") {
    return "video"
  } else if (fileType === "mp3" || fileType === "mpeg" || fileType === "wav" || fileType === "ogg" || fileType === "aac" || fileType === "wma" || fileType === "m4a" || fileType === "m4b" || fileType === "m4r" || fileType === "m4s") {
    return "audio"
  } else if (fileType === "png" || fileType === "jpg" || fileType === "jpeg" || fileType === "gif" || fileType === "bmp" || fileType === "webp") {
    return "image"
  }
  else {
    return "other"
  }
}

function transform(value, unit) {
  if (value === undefined || value === null) {
    return "";
  }
  let result = value.toString();
  result = result / etherTable[unit];
  return result;
}

function mergeAndSort(a, b) {
  // From
  let result = [];
  let tempA = [];
  let tempB = [];
  a.forEach(function (item) {
    let req = 0
    let file = ""
    let type = ""
    let delString1 = "";
    let delString2 = "";
    let delString3 = "";
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
    let json = {
      blocktime: item.blocktime,
      money: transform(item.value, "ether"),
      type: "from",
      to: item.to,
      message: item.mess.replace(delString1, "").replace(delString2, "").replace(delString3, ""),
      req,
      file,
      typef: detectFileType(type)
    };
    tempA.push(json);
  });
  b.forEach(function (item) {
    // to
    let req = 0
    let file = ""
    let type = ""
    let delString1 = "";
    let delString2 = "";
    let delString3 = "";
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
    let json = {
      blocktime: item.blocktime,
      money: transform(item.value, "ether"),
      type: "to",
      to: item.to,
      message: item.mess.replace(delString1, "").replace(delString2, "").replace(delString3, ""),
      req,
      file,
      typef: detectFileType(type)
    };
    tempB.push(json);
  });
  result = result.concat(tempA);
  result = result.concat(tempB);
  result.sort((a, b) => {
    return a.blocktime - b.blocktime;
  });
  return result;
}

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

async function FILUSD() { // ACTIVATE FOR PRODUCTION
  return 0
  return new Promise((resolve, reject) => {
    var config = {
      method: 'get',
      url: 'https://3jsx8383rg.execute-api.us-east-1.amazonaws.com/-filecoin-price',
    };
    axios(config)
      .then((response) => {
        console.log(response.data)
        resolve(response.data.data.FIL.quote.USD.price)
      })
      .catch((error) => {
        reject(0)
      });
  })
}

function sortFilesAndFilter(array, filter = "") {
  let tempImg = []
  let tempAudio = []
  let tempVideo = []
  let tempPDF = []
  let tempTXT = []
  let tempOther = []
  array.forEach(item => {
    detectFileTypeExplorer(item.name) === "audio" && tempAudio.push(item)
    detectFileTypeExplorer(item.name) === "image" && tempImg.push(item)
    detectFileTypeExplorer(item.name) === "video" && tempVideo.push(item)
    detectFileTypeExplorer(item.name) === "pdf" && tempPDF.push(item)
    detectFileTypeExplorer(item.name) === "txt" && tempTXT.push(item)
    detectFileTypeExplorer(item.name) === "other" && tempOther.push(item)
  })
  if (filter === "audio") {
    return tempAudio
  }
  else if (filter === "image") {
    return tempImg
  }
  else if (filter === "video") {
    return tempVideo
  }
  else if (filter === "pdf") {
    return tempPDF
  }
  else if (filter === "txt") {
    return tempTXT
  }
  else if (filter === "other") {
    return tempOther
  }
  let temp = []
  return temp.concat(tempAudio, tempImg, tempVideo, tempPDF, tempTXT, tempOther)
}

function removeDuplicates(array) {
  let jsonObject = array.map(JSON.stringify);
  let uniqueSet = new Set(jsonObject);
  let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  return uniqueArray;
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      to: "",
      visible: true,
      fetchFlag: false,
      checked: false,
      message: "",
      number: 0,
      messageHistory: [],
      sending: false,
      noMessage: false,
      myData: [],
      activeAddress: this.props.match.params.address,
      changeFlag: false,
      addresses: [
        this.props.match.params.address
      ],
      activeIndex: 0,
      flagNoAddress: false,
      file: null,
      nft: [],
      menuSelector: 0, // 0
      files: [],
      uploadButton: false,
      explorerSelector: "all",
      // Price Feeds
      avax: 0,
      bnb: 0,
      btc: 0,
      dot: 0,
      eth: 0,
      link: 0,
      matic: 0,
      neo: 0,
      sol: 0,
      usdc: 0,
      xrp: 0,
      prices: [],
      symbol: ["AVAX", "BNB", "BTC", "DOT", "ETH", "FIL", "LINK", "MATIC", "NEO", "SOL", "USDC", "XRP"],
      icons: [avax, bnb, btc, dot, eth, fil, link, matic, neo, sol, usdc, xrp],
      walletScreen: 1, // 0
      accountSelector: 0,
      ewallet: "ewallet_3d5f8255483d050323a2b095f84c57fa",
      fileNFT: null,
      nameNFT: "",
      descNFT: "",
      addressNFT: "",
      cidNFT: "",
      uploadButtonNFT: false,
      sharedFiles: [],
      sharedSelector: false
    }
    autoBind(this);
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    this.web3 = new Web3(window.ethereum);
    this.chatContract = null;
    this.fetchInterval = null;
  }

  // Component Functions

  async componentDidMount() {
    let startFlag = this.props.match.params.address ? true : false;
    if (startFlag) {
      if (this.props.match.params.address === "" || this.props.match.params.address.length !== 42) {
        startFlag = false;
      }
    }
    if (!startFlag) {
      this.setState({
        flagNoAddress: true
      })
      console.log("No address found. Please enter a valid address.")
    }
    else {
      const { cookies } = this.props;
      let temp = cookies.get('address') || this.state.addresses;
      let flag = false
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] === this.props.match.params.address) {
          flag = true;
          break;
        }
      }
      if (flag) {
        cookies.set('address', temp, { path: '/' });
        this.setState({
          addresses: temp,
          activeAddress: this.props.match.params.address,
          activeIndex: temp.indexOf(this.props.match.params.address)
        })
      }
      else {
        temp.push(this.props.match.params.address)
        cookies.set('address', temp, { path: '/' });
        this.setState({
          addresses: temp,
          activeAddress: this.props.match.params.address,
          activeIndex: temp.indexOf(this.props.match.params.address)
        })
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      this.chatContract = new ethers.Contract(contractAddress, abi(), this.provider.getSigner());
      let balance = await getMaticBalance(account)
      this.setState({
        account: {
          ethAddress: account,
          balance: transform(balance, "ether"),
        }, visible: false
      }, async () => {
        document.body.style.backgroundImage = `url(${back})`
        //console.clear();
        this.getFiles(account)
        this.syncNFT(account)
        await this.getMessagesFromAccount(account, this.props.match.params.address)
        this.getSharedFiles(account, this.props.match.params.address)
        this.fetchInterval = setInterval(() => {
          if (!this.state.fetchFlag && window.ethereum.isConnected()) {
            this.setState({
              fetchFlag: true,
            }, () => {
              //console.log("Fetching messages from account")
              this.getPriceFeed()
              this.syncNFT(account)
              this.getMessagesFromAccount(this.state.account.ethAddress, this.state.activeAddress)
              this.getSharedFiles(account, this.props.match.params.address)
            })
          }
        }, 5000);
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.connectInterval);
    clearInterval(this.fetchInterval);
    clearInterval(this.updateData);
  }

  // Async Store NFT Storage

  async NFTstorageStore() {
    return new Promise((resolve, reject) => {
      var data = new FormData();
      data.append('meta', `{"description":"${this.state.nameNFT}", "name": "${this.state.descNFT}"}`);
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

  async deployNFT() {
    //let contract = await this.createContract()
    //console.log(contract)
    //let test = await this.NFTstorageStore()
    let mintRes = await this.mintNFT()
    console.log(mintRes)
  }

  async createContract() {
    return new Promise((resolve, reject) => {
      const deploy_contract = new this.web3.eth.Contract(abi2());
      // Function Parameter
      let payload = {
        data: "0x" + bytecode2()
      }

      let parameter = {
        from: this.state.account.ethAddress
      }
      // Function Call
      deploy_contract.deploy(payload).send(parameter, (err, transactionHash) => {
      }).on('confirmation', () => { }).then((newContractInstance) => {
        this.setState({
          addressNFT: newContractInstance.options.address
        }, () => resolve(newContractInstance.options.address))
      });
    })
  }

  async mintNFT() {
    return new Promise((resolve, reject) => {
      const mint_contract = new this.web3.eth.Contract(abi2(), this.state.addressNFT, { from: this.state.account.ethAddress });
      mint_contract.methods.mint(this.state.cidNFT).send().on('confirmation', () => { resolve("OK") })
    })
  }

  // Shared Functions

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

  // Shared Files

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

  // Explorer functions

  async getFilesAsync(address) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({
        "path": address
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
        .then((res) => resolve(res.data))
        .catch((error) => reject(error));
    })
  }

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

  async fetchFile() {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({
        "path": this.state.account.ethAddress
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
        .then((res) => resolve(fileSearch(res.data, "name", this.state.file.name)))
        .catch((error) => {
          reject("Error")
        });
    })
  }

  // Chat Functions

  async getMessagesFromAccount(from, to) {
    const tempChangeFlag = this.state.changeFlag
    const result = await this.getAndProcessMessages(from, to);
    if (result.length > 0) {
      if (this.state.myData.length < result.length || this.state.changeFlag) {
        console.log("Get New Messages")
        if (tempChangeFlag !== this.state.changeFlag) {
          this.setState({
            messageHistory: [],
            noMessage: false,
            myData: [],
            fetchFlag: false
          })
        }
        else if (result.length > 0) {
          this.setState({
            messageHistory: result,
            changeFlag: false
          }, () => {
            var elmnt = document.getElementById("ChatWindow");
            elmnt.scrollTop = elmnt.scrollHeight;
            this.setState({
              sending: false,
              number: 0,
              req: false,
              message: "",
              noMessage: false,
              myData: result,
              fetchFlag: false
            }, console.log("OK"))
          })
        }
        else {
          this.setState({
            noMessage: true,
            myData: [],
            changeFlag: false,
            fetchFlag: false
          })
        }
      }
      else {
        this.setState({
          fetchFlag: false
        })
      }
    }
    else {
      this.setState({
        noMessage: true,
        myData: [],
        changeFlag: false,
        fetchFlag: false
      })
    }
  }

  async sendMessage(to, message, num) {
    this.setState({
      sending: true
    }, async () => {
      let tempMessage = message;
      if (this.state.req) {
        tempMessage += ":req:" + num.toString() + ":reqf:"
      }
      if (this.state.file !== null) {
        await this.uploadFile(this.state.account.ethAddress)
        let res = await this.fetchFile()
        tempMessage += `:file:${res}:filef::type:${this.state.file.type}:typef:`
      }
      const options = { value: this.state.req ? "0" : ethers.utils.parseEther(num.toString()) }
      const transaction = await this.chatContract.addMessage(to, tempMessage, options)
      await transaction.wait();
      this.setState({
        sending: false,
        req: false,
        message: "",
        file: null,
      })
    })
  }

  async checkMessages(account, to) {
    let messages = [];
    try {
      const messagesCounter = await this.chatContract.chatCounter(account); // Check 
      for (let i = 0; i < messagesCounter; i++) {
        let result = await this.chatContract.chatHistory(account, i)
        if (result.to.toLowerCase() === to.toLowerCase()) {
          messages.push(result);
        }
      }
    }
    catch (e) {
      console.clear();
      console.log("RPC Catch Error")
      return "error"
    }
    return messages;
  }
  ////// Get All Messages from and to accounts

  async getAndProcessMessages(from, to) {
    let from_messages = await this.checkMessages(from, to);
    let to_messages = await this.checkMessages(to, from);
    if (from_messages === "error" || to_messages === "error") {
      return this.state.myData
    }
    let messages = mergeAndSort(from_messages, to_messages);
    return messages;
  }

  // Wallet Functions

  async getPriceFeed() {
    try {
      let contract = new ethers.Contract(priceFeed, abi3(), providerMatic);
      let priceAVAX = await contract.getLatestAVAXPrice();
      let priceBNB = await contract.getLatestBNBPrice();
      let priceBTC = await contract.getLatestBTCPrice();
      let priceDOT = await contract.getLatestDOTPrice();
      let priceETH = await contract.getLatestETHPrice();
      let priceFIL = await FILUSD()
      let priceLINK = await contract.getLatestLINKPrice();
      let priceMATIC = await contract.getLatestMATICPrice();
      let priceNEO = await contract.getLatestNEOPrice();
      let priceSOL = await contract.getLatestSOLPrice();
      let priceUSDC = await contract.getLatestUSDCPrice();
      let priceXRP = await contract.getLatestXRPPrice();

      let prices = {
        avax: parseFloat((priceAVAX).toString()) / 100000000,
        bnb: parseFloat((priceBNB).toString()) / 100000000,
        btc: parseFloat((priceBTC).toString()) / 100000000,
        dot: parseFloat((priceDOT).toString()) / 100000000,
        eth: parseFloat((priceETH).toString()) / 100000000,
        fil: priceFIL,
        link: parseFloat((priceLINK).toString()) / 100000000,
        matic: parseFloat((priceMATIC).toString()) / 100000000,
        neo: parseFloat((priceNEO).toString()) / 100000000,
        sol: parseFloat((priceSOL).toString()) / 100000000,
        usdc: parseFloat((priceUSDC).toString()) / 100000000,
        xrp: parseFloat((priceXRP).toString()) / 100000000,
      }
      this.setState({
        prices: [
          epsilonRound(prices.avax),
          epsilonRound(prices.bnb),
          epsilonRound(prices.btc),
          epsilonRound(prices.dot),
          epsilonRound(prices.eth),
          epsilonRound(prices.fil),
          epsilonRound(prices.link),
          epsilonRound(prices.matic),
          epsilonRound(prices.neo),
          epsilonRound(prices.sol),
          prices.usdc,
          epsilonRound(prices.xrp),
        ],
      })
    }
    catch {
      // nothing
    }
  }

  // NFT functions

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

  render() {
    const style1 = {
      borderRadius: '25px 25px 0px 0px',
      backgroundColor: '#1b5eb5',
      fontSize: '20px',
      fontWeight: 'bold',
    }
    const style2 = {
      border: '2px solid #1b5eb5',
      borderRadius: '25px 25px 0px 0px',
      backgroundColor: '#ffffff',
      color: 'black',
      fontSize: '20px',
      fontWeight: 'bold',
    }
    return (
      <>
        {
          this.state.visible ? // Address Screen
            <>
              <div className='parent'>
                <div className='child'>
                  {
                    this.state.flagNoAddress ?
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}>
                        <img alt="MainLogo" src={LogoN} width="300px" />
                        <div style={{ fontSize: "2.4rem", textAlign: "center", color: "black", width: "80vw" }}>
                          Type a Polygon Testnet (mumbai) address to start chatting.
                        </div>
                        <p />
                        <Input
                          id="addressValueInit0128"
                          placeholder="Address"
                          style={{
                            width: '70%',
                            border: "solid 1px #1b5eb5",
                            background: "white",
                            color: "black",
                            fontSize: "1.5rem",
                            textAlign: "center",
                          }}
                        />
                        <p />
                        <button
                          style={{
                            fontSize: "2vw",
                            width: "70%",
                          }}
                          className='myButton' onClick={() => {
                            if (document.getElementById("addressValueInit0128").value.length === 42) {
                              window.open(`/${document.getElementById("addressValueInit0128").value}`, "_self")
                            }
                            else {
                              alert("Invalid Address")
                              document.getElementById("addressValueInit0128").value = ""
                            }
                          }} >
                          Start Chat
                        </button>
                        <p />
                        <p />
                        <Row>
                          <Col>
                            <Row style={{ textAlign: "center" }}>
                              <a href='https://github.com/altaga/DappChat' target='_blank' rel="noopener noreferrer">
                                <img src={githubLogo} alt="github" style={{ width: "100px", height: "100px" }} />
                              </a>
                              <div>
                                Github Repo
                              </div>
                            </Row>
                          </Col>
                          <Col>
                            <Row style={{ textAlign: "center" }}>
                              <a href='https://app.valist.io/altaga/dappchat' target='_blank' rel="noopener noreferrer">
                                <img src={valistLogo} alt="twitter" style={{ width: "100px", height: "100px" }} />
                              </a>
                              <p />
                              <div>
                                Valist Release
                              </div>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                      :
                      <Spinner style={{
                        width: "100px",
                        height: "100px",
                        color: "#1b5eb5",
                      }}>
                        Loading...
                      </Spinner>
                  }
                </div>
              </div>
            </>
            :                  // Main Screen
            <>
              <div className='parent' style={{
                overflow: "hidden",
                height: "100vh",
                width: "100vw"
              }}>
                {
                  // Selector Bar
                }
                <Card style={{ position: "absolute", left: "10vw", top: "2.9vh", height: "94vh", width: "5vw" }}>
                  {
                    <Row md="1">
                      <Col style={{
                        paddingTop: "1.3vh"
                      }}>
                        <div
                          onClick={() => this.setState({ menuSelector: 0 })}
                          style={{
                            cursor: "pointer",
                            textAlign: "center"
                          }}
                        >
                          <MessageIcon
                            style={{
                              width: "100%",
                              fontSize: "3rem",
                              color: this.state.menuSelector === 0 ? "#1b5eb5" : "black"
                            }}
                          />
                          <span>
                            Chat
                          </span>
                        </div>
                      </Col>
                      <Col style={{
                        paddingTop: "2.5vh"
                      }}>
                        <div onClick={() => this.setState({ menuSelector: 1 })}
                          style={{
                            cursor: "pointer",
                            textAlign: "center"
                          }}>
                          <FolderIcon
                            style={{
                              width: "100%",
                              fontSize: "3rem",
                              color: this.state.menuSelector === 1 ? "#1b5eb5" : "black"
                            }}
                          />
                          <span>
                            Explorer
                          </span>
                        </div>
                      </Col>
                      <Col style={{
                        paddingTop: "3vh"
                      }}>
                        <div onClick={() => this.setState({ menuSelector: 2 })}
                          style={{
                            cursor: "pointer",
                            textAlign: "center"
                          }}>
                          <AccountBalanceWalletIcon
                            style={{
                              width: "100%",
                              fontSize: "3rem",
                              color: this.state.menuSelector === 2 ? "#1b5eb5" : "black"
                            }}
                          />
                          <span>
                            Wallet
                          </span>
                        </div>
                      </Col>
                      <Col style={{
                        paddingTop: "3vh"
                      }}>
                        <div onClick={() => this.setState({ menuSelector: 3 })}
                          style={{
                            cursor: "pointer",
                            textAlign: "center"
                          }}>
                          <img
                            alt="nftIcon"
                            width="70%"
                            src={this.state.menuSelector === 3 ? apesel : apebn}
                          />
                          <span>
                            NFT's
                          </span>
                        </div>
                      </Col>
                    </Row>
                  }
                </Card>
                {
                  // Main Screen Selected
                }
                <div className='child'>
                  {
                    // Chat
                  }
                  <div hidden={this.state.menuSelector === 0 ? false : true}>
                    <Card style={{ height: "94vh", width: "70vw", background: "white" }}>
                      <Row>
                        <Col style={{ width: "30%", height: "100%", color: "black" }}>
                          <CardBody>
                            <Row style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                              <div style={{ width: "25%" }}>
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                  <img src={Logo} alt="Logo" style={{ height: "100%", width: "100%", objectFit: "contain" }} />
                                </a>
                              </div>
                              <div style={{ width: "10%" }}>
                                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                  |
                                </div>
                              </div>
                              <div style={{ fontSize: "1.2rem", width: "65%", paddingTop: "7px" }}>
                                Wallet: {this.state.account.ethAddress.substring(0, 6)}...{this.state.account.ethAddress.substring(this.state.account.ethAddress.length - 6, this.state.account.ethAddress.length)}
                              </div>
                            </Row>
                          </CardBody>
                          <div style={{
                            height: "1px",
                            width: "21.5vw",
                            background: "#1b5eb5",
                            marginTop: "2px",
                            marginBottom: "2px",
                          }} />
                          {
                            this.state.addresses.map((address, index) => {
                              return (
                                <div key={index + "okok"}>
                                  <CardBody style={{ fontSize: "1.2rem", color: this.state.activeIndex !== index ? "black" : "white", background: this.state.activeIndex !== index ? "" : "#1b5eb5", width: "21.5vw" }} onClick={() => {
                                    if (!this.state.changeFlag && this.state.activeIndex !== index) {
                                      this.setState({
                                        activeAddress: address,
                                        changeFlag: true,
                                        activeIndex: index,
                                        messageHistory: [],
                                        noMessage: false,
                                        myData: []
                                      })
                                    }
                                  }}
                                  >
                                    <Row>
                                      <Col>
                                        {
                                          address.substring(0, 10) + "..." + address.substring(address.length - 10, address.length)
                                        }
                                      </Col>
                                    </Row>
                                  </CardBody>
                                  <div style={{
                                    height: "1px",
                                    width: "21.5vw",
                                    background: "white",
                                  }} />
                                </div>
                              )
                            })
                          }
                        </Col>
                        <Col xs="8" style={{
                          borderColor: "#7837e6",
                          width: "70%",
                          height: "94vh",
                        }}>
                          <CardTitle style={{ background: "#1b5eb5", height: "auto", padding: "10px" }}>
                            <Row>
                              <Col xs="12">
                                <div style={{ fontSize: "1.2rem", color: "white", fontWeight: "bold" }}>
                                  Chat with: {this.state.activeAddress}
                                </div>
                              </Col>
                            </Row>
                          </CardTitle>
                          <CardBody style={{ background: "white" }}>
                            {
                              (this.state.messageHistory.length > 0 && !this.state.changeFlag) ?
                                <div id="ChatWindow" style={{ overflowY: "auto", maxHeight: this.state.checked ? "64vh" : "69vh" }}>
                                  {
                                    this.state.messageHistory.map((message, index) => {
                                      let margin;
                                      try {
                                        margin = this.state.messageHistory[index - 1].type !== this.state.messageHistory[index].type ? "10px" : "0px"
                                      }
                                      catch {
                                        margin = "0px"
                                      }
                                      return (
                                        <div key={"elementd" + index}>
                                          {
                                            message.type === "to" ?
                                              <div>
                                                <Card style={{
                                                  maxWidth: "70%",
                                                  width: "51%",
                                                  float: "left",
                                                  marginTop: margin,
                                                  background: "#ffbc42",
                                                  color: "black",
                                                  borderColor: "white"
                                                }}>
                                                  {
                                                    message.file.length > 0 ?
                                                      <CardBody>
                                                        <div style={{
                                                          fontSize: "16px",
                                                          color: "black"
                                                        }}>
                                                          {
                                                            message.typef === "image" &&
                                                            <>
                                                              <Modals
                                                                type="image"
                                                                message={message}
                                                                index={index}
                                                              />
                                                              <a style={{
                                                                color: "black"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                          {
                                                            message.typef === "video" &&
                                                            <>
                                                              <Player src={message.file} >
                                                                <BigPlayButton position="center" />
                                                              </Player>
                                                              <a style={{
                                                                color: "black"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                          {
                                                            message.typef === "audio" &&
                                                            <>
                                                              <ReactAudioPlayer
                                                                src={message.file}
                                                                controls
                                                                style={{
                                                                  width: "100%"
                                                                }}
                                                              />
                                                              <a style={{
                                                                color: "black"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                          {
                                                            message.typef === "pdf" &&
                                                            <>
                                                              <button
                                                                style={{ fontSize: "1.3rem", width: "40%" }}
                                                                className="myButton2"
                                                                onClick={() => {
                                                                  window.open(message.file, "_blank")
                                                                }}>   Open PDF </button>
                                                              <a style={{
                                                                color: "black"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                          {
                                                            message.typef === "txt" &&
                                                            <>
                                                              <button
                                                                style={{ fontSize: "1.3rem", width: "40%" }}
                                                                className="myButton2"
                                                                onClick={() => {
                                                                  window.open(message.file, "_blank")
                                                                }}>   Open TXT </button>
                                                              <a style={{
                                                                color: "black"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                          {
                                                            message.typef === "other" &&
                                                            <>
                                                              <button
                                                                style={{ fontSize: "1.3rem", width: "40%" }}
                                                                className="myButton2"
                                                                onClick={() => {
                                                                  window.open(message.file, "_blank")
                                                                }}>   Open File </button>
                                                              <a style={{
                                                                color: "black"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                        </div>
                                                      </CardBody>
                                                      : <div key={"noKey" + index} />
                                                  }
                                                  {
                                                    message.message.length > 0 ?
                                                      <CardBody>
                                                        <div style={{
                                                          fontSize: "1.2rem",
                                                          color: "black"
                                                        }}>
                                                          {message.message}
                                                        </div>
                                                      </CardBody>
                                                      : <div />
                                                  }
                                                  <CardFooter
                                                    style={{
                                                      paddingTop: "34px"
                                                    }}
                                                  >
                                                    {
                                                      message.money !== 0 &&
                                                      <div style={{
                                                        fontSize: "1.2rem",
                                                        color: message.money >= 0 ? "green" : "red",
                                                        position: "absolute",
                                                        bottom: "5px",
                                                        left: "10px",
                                                      }}>
                                                        {message.money} MATIC {message.money >= 0 ? "Recieved" : "Sent"}
                                                      </div>
                                                    }
                                                    {
                                                      message.req > 0 &&
                                                      <div style={{
                                                        fontSize: "16px",
                                                        position: "absolute",
                                                        bottom: "5px",
                                                        left: "10px",
                                                        width: "100%",
                                                        color: "black"
                                                      }}>
                                                        {message.req} MATIC {"Requested"} &nbsp;&nbsp;&nbsp;
                                                        <button
                                                          className="myButton"
                                                          onClick={() => {
                                                            this.setState({
                                                              number: message.req
                                                            }, () => {
                                                              this.sendMessage(this.state.activeAddress, this.state.message, this.state.number)
                                                            })
                                                          }}
                                                          disabled={this.state.sending}
                                                        >
                                                          {
                                                            <SendIcon />
                                                          }
                                                        </button>
                                                      </div>
                                                    }
                                                    <div style={{
                                                      fontSize: "12px",
                                                      color: "black",
                                                      position: "absolute",
                                                      bottom: "5px",
                                                      right: "6px"
                                                    }}>
                                                      {
                                                        new Date(message.blocktime * 1000).toLocaleTimeString()
                                                      }
                                                      {
                                                        " "
                                                      }
                                                      <a href={`https://mumbai.polygonscan.com/address/${this.state.activeAddress}`} target="_blank" rel="noopener noreferrer">
                                                        <LinkIcon />
                                                      </a>
                                                    </div>
                                                  </CardFooter>
                                                </Card>
                                              </div>
                                              :
                                              <div>
                                                <Card style={{
                                                  maxWidth: "70%",
                                                  width: "50%",
                                                  float: "right",
                                                  marginTop: margin,
                                                  marginRight: "24px",
                                                  background: "#1b5eb5",
                                                  color: "#1b5eb5",
                                                }}>
                                                  {
                                                    message.file.length > 0 ?
                                                      <CardBody>
                                                        <div style={{
                                                          fontSize: "16px",
                                                          color: "white"
                                                        }}>
                                                          {
                                                            message.typef === "image" &&
                                                            <>
                                                              <Modals
                                                                type="image"
                                                                message={message}
                                                                index={index}
                                                              />
                                                              <a style={{
                                                                color: "white"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                          {
                                                            message.typef === "video" &&
                                                            <>
                                                              <Player src={message.file} >
                                                                <BigPlayButton position="center" />
                                                              </Player>
                                                              <a style={{
                                                                color: "white"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                          {
                                                            message.typef === "audio" &&
                                                            <>
                                                              <ReactAudioPlayer
                                                                src={message.file}
                                                                controls
                                                                style={{
                                                                  width: "100%"
                                                                }}
                                                              />
                                                              <a style={{
                                                                color: "white"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                          {
                                                            message.typef === "pdf" &&
                                                            <>
                                                              <button
                                                                style={{ fontSize: "1.3rem", width: "40%" }}
                                                                className="myButton2"
                                                                onClick={() => {
                                                                  window.open(message.file, "_blank")
                                                                }}>   Open PDF </button>
                                                              <a style={{
                                                                color: "white"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                          {
                                                            message.typef === "txt" &&
                                                            <>
                                                              <button
                                                                style={{ fontSize: "1.3rem", width: "40%" }}
                                                                className="myButton2"
                                                                onClick={() => {
                                                                  window.open(message.file, "_blank")
                                                                }}>   Open TXT </button>
                                                              <a style={{
                                                                color: "white"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                          {
                                                            message.typef === "other" &&
                                                            <>
                                                              <button
                                                                style={{ fontSize: "1.3rem", width: "40%" }}
                                                                className="myButton2"
                                                                onClick={() => {
                                                                  window.open(message.file, "_blank")
                                                                }}>   Open File </button>
                                                              <a style={{
                                                                color: "white"
                                                              }} href={message.file} target="_blank" rel="noopener noreferrer">
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(0, 23)}
                                                                <br />
                                                                {message.file.replace(IPFSgateway, "").substring(23, 46)}
                                                              </a>
                                                            </>
                                                          }
                                                        </div>
                                                      </CardBody>
                                                      : <div />
                                                  }
                                                  {
                                                    message.message.length > 0 ?
                                                      <CardBody>
                                                        <div style={{
                                                          fontSize: "1.2rem",
                                                          color: "white"
                                                        }}>
                                                          {message.message}
                                                        </div>
                                                      </CardBody>
                                                      : <div />
                                                  }
                                                  <CardFooter
                                                    style={{
                                                      paddingTop: "34px"
                                                    }}
                                                  >
                                                    {
                                                      message.money !== 0 &&
                                                      <div style={{
                                                        fontSize: "1.2rem",
                                                        color: message.money >= 0 ? "#ff8988" : "green",
                                                        position: "absolute",
                                                        bottom: "4px",
                                                        left: "10px",
                                                      }}>
                                                        {message.money} MATIC {message.money >= 0 ? "Sent" : "Received"}
                                                      </div>
                                                    }
                                                    {
                                                      message.req > 0 &&
                                                      <div style={{
                                                        fontSize: "16px",
                                                        color: "white",
                                                        position: "absolute",
                                                        bottom: "4px",
                                                        left: "10px",
                                                      }}>
                                                        {message.req} MATIC {"Requested"}
                                                      </div>
                                                    }
                                                    <div style={{
                                                      fontSize: "12px",
                                                      color: "white",
                                                      position: "absolute",
                                                      bottom: "4px",
                                                      right: "10px"
                                                    }}>
                                                      {
                                                        new Date(message.blocktime * 1000).toLocaleTimeString()
                                                      }
                                                      {
                                                        " "
                                                      }
                                                      <a href={`https://mumbai.polygonscan.com/address/${this.state.account.ethAddress}`} target="_blank" rel="noopener noreferrer">
                                                        <LinkIcon />
                                                      </a>
                                                    </div>
                                                  </CardFooter>
                                                </Card>
                                              </div>
                                          }
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                :
                                <>
                                  <div className='parent'>
                                    <div className='child2'>
                                      {
                                        this.state.noMessage ?
                                          <div style={{
                                            width: "50vw",
                                            fontSize: "24px",
                                            color: "black",
                                            position: "absolute",
                                            top: "50%",
                                            left: "18vw",
                                            transform: "translate(-50%, -50%)"
                                          }}>
                                            No Messages yet...
                                          </div>
                                          :
                                          <Spinner style={{
                                            width: "100px",
                                            height: "100px",
                                            color: "#1b5eb5",
                                          }}>
                                            Loading...
                                          </Spinner>
                                      }
                                    </div>
                                  </div>
                                  <p></p>
                                </>
                            }
                            <p></p>
                          </CardBody>
                          <CardFooter style={{ background: "white", position: "absolute", bottom: "0px", width: "69%" }}>
                            <Row>
                              <div style={{
                                width: '8%',
                                paddingTop: "5px"
                              }}>
                                <input
                                  type="file"
                                  id="upload"
                                  hidden
                                  onChange={async (e) => {
                                    this.setState({
                                      file: e.target.files[0],
                                    })
                                  }}
                                  disabled={this.state.sending}
                                />
                                <label htmlFor="upload">
                                  {
                                    this.state.sending ? <Spinner /> :
                                      <>
                                        {
                                          this.state.file !== null ?
                                            <div
                                              style={{
                                                color: "green",
                                              }}>
                                              <AttachFileIcon />
                                            </div>
                                            :
                                            <>
                                              <AttachFileIcon />
                                            </>
                                        }
                                      </>
                                  }
                                </label>
                              </div>
                              <Input
                                placeholder="Message"
                                style={{
                                  width: '62%',
                                  border: "solid 1px #1b5eb5",
                                  background: "white",
                                  color: "black",
                                  fontSize: "1.1rem",
                                }}
                                value={this.state.message}
                                onChange={(e) => {
                                  this.setState({
                                    message: e.target.value
                                  })
                                }}
                              />
                              <button
                                style={{
                                  width: "15%",
                                  color: "white"
                                }}
                                className="myButton"
                                onClick={
                                  () => {
                                    this.sendMessage(this.state.activeAddress, this.state.message, 0)
                                  }
                                }
                                disabled={(!(this.state.message.length > 0) || this.state.sending)}
                              >
                                {
                                  this.state.sending ? <Spinner /> : <SendIcon />
                                }
                              </button>
                              <button
                                id="moneyButton"
                                style={{
                                  width: "15%",
                                  color: "white"
                                }}
                                className="myButton"
                                onClick={() => {
                                  this.setState({
                                    checked: !this.state.checked
                                  }, () => {
                                    if (this.state.messageHistory > 0) {
                                      var elmnt = document.getElementById("ChatWindow");
                                      elmnt.scrollTop = elmnt.scrollHeight;
                                    }
                                  })
                                }}
                              >
                                {
                                  this.state.checked ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />
                                }
                              </button>
                            </Row>
                            {
                              this.state.checked &&
                              <>
                                <p></p>
                                <Row key="rows">
                                  <Input
                                    type="number"
                                    placeholder="number"
                                    value={this.state.number}
                                    style={{
                                      width: '60%',
                                      fontSize: "1.2rem",
                                      background: "white",
                                      color: "black",
                                      border: "solid 1px #1b5eb5",
                                    }}
                                    onChange={(e) => {
                                      this.setState({
                                        number: e.target.value
                                      })
                                    }}
                                  />
                                  <button
                                    style={{
                                      width: "20%",
                                      fontSize: "1.2rem",
                                      color: "white"
                                    }}
                                    className="myButton"
                                    onClick={() => {
                                      this.setState({
                                        req: true
                                      }, () => {
                                        this.sendMessage(this.state.activeAddress, this.state.message, this.state.number)
                                      })
                                    }
                                    }
                                    disabled={!(this.state.number > 0) || this.state.sending}
                                  >
                                    Request MATIC
                                  </button>
                                  <button
                                    style={{
                                      width: "20%",
                                      fontSize: "1.2rem",
                                      color: "white"
                                    }}
                                    className="myButton"
                                    onClick={() => {
                                      this.setState({
                                        req: false
                                      }, () => {
                                        this.sendMessage(this.state.activeAddress, this.state.message, this.state.number)
                                      })
                                    }}
                                    disabled={!(this.state.number > 0) || this.state.sending}
                                  >
                                    Send MATIC
                                  </button>
                                </Row>
                              </>
                            }
                          </CardFooter>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                  {
                    // Explorer
                  }
                  <div hidden={this.state.menuSelector === 1 ? false : true}>
                    <Card style={{ height: "94vh", width: "70vw", background: "white" }}>
                      <CardHeader style={{ fontSize: "1.3rem" }}>
                        <Row>
                          <Col xs="2">
                            My Files
                          </Col>
                          <Col xs="3">
                            <Input
                              defaultValue={"all"}
                              type="select"
                              onChange={(e) => {
                                if (e.target.value === "shared") {
                                  this.setState({
                                    explorerSelector: e.target.value,
                                    sharedSelector: true
                                  })
                                }
                                else {
                                  this.setState({
                                    explorerSelector: e.target.value,
                                    sharedSelector: false
                                  })
                                }
                              }}
                            >
                              <option value={"all"}>All my Files</option>
                              <option value={"image"}>Image Files</option>
                              <option value={"audio"}>Audio Files</option>
                              <option value={"video"}>Video Files</option>
                              <option value={"pdf"}>PDF Files</option>
                              <option value={"txt"}>Txt Files</option>
                              <option value={"other"}>Other Files</option>
                              <option value={"shared"}>Shared Files</option>
                            </Input>
                          </Col>
                          <Col xs="3">
                            <Input
                              id="fileInput"
                              type='file'
                              onChange={async (e) => {
                                this.setState({
                                  file: e.target.files[0],
                                })
                              }}
                            />
                          </Col>
                          <Col xs="1" style={{
                            textAlign: "center"
                          }}>
                            <Tooltips2 info={"Uploaded to https://chainsafe.io/"} color="#ffbc42">
                              <InfoIcon />
                            </Tooltips2>
                          </Col>
                          <Col xs="3">
                            <button
                              style={{
                                fontSize: "1.2rem",
                                padding: "4px 14px 2px",
                                width: "100%",
                                color: "white"
                              }}
                              className="myButton"
                              disabled={this.state.uploadButton || !(this.state.file ? true : false)}
                              onClick={async () => {
                                this.setState({
                                  uploadButton: true
                                }, async () => {
                                  await this.uploadFile(this.state.account.ethAddress)
                                  await this.getFiles(this.state.account.ethAddress)
                                  document.getElementById("fileInput").value = null
                                  this.setState({
                                    file: null,
                                    uploadButton: false
                                  })
                                })
                              }}
                            >
                              Upload
                            </button>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Row md={4} style={{
                          height: "80vh",
                          overflowY: "scroll"
                        }}>
                          {
                            !this.state.sharedSelector ?
                              this.state.files.length > 0 && sortFilesAndFilter(this.state.files, this.state.explorerSelector).map((item, index) => {
                                return (
                                  <div key={index + "myfile"}>
                                    <Col
                                      id={index + "myfile"}
                                      style={{
                                        color: "black",
                                        borderRadius: "25px",
                                        padding: "20px"
                                      }}
                                      onMouseEnter={() => {
                                        document.getElementById(index + "myfile").style.background = "#ffbc4233"
                                      }}
                                      onMouseLeave={() => {
                                        document.getElementById(index + "myfile").style.background = "white"
                                      }}
                                    >
                                      {
                                        detectFileTypeExplorer(item.name) === "image" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <ModalImage src={IPFSgateway + item.cid} name={item.name} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                      {
                                        detectFileTypeExplorer(item.name) === "video" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <ModalVideo src={IPFSgateway + item.cid} name={item.name} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                      {
                                        detectFileTypeExplorer(item.name) === "audio" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <ModalAudio src={IPFSgateway + item.cid} name={item.name} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                      {
                                        detectFileTypeExplorer(item.name) === "pdf" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <PictureAsPdfIcon
                                            onClick={() => {
                                              window.open(IPFSgateway + item.cid, "_blank")
                                            }}
                                            style={{
                                              fontSize: "6rem"
                                            }} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                      {
                                        detectFileTypeExplorer(item.name) === "txt" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <ModalText src={IPFSgateway + item.cid} name={item.name} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                      {
                                        detectFileTypeExplorer(item.name) === "other" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <CheckBoxOutlineBlankIcon
                                            onClick={() => {
                                              window.open(IPFSgateway + item.cid, "_blank")
                                            }}
                                            style={{
                                              fontSize: "6rem"
                                            }} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                    </Col>
                                  </div>
                                )
                              })
                              :
                              this.state.sharedFiles.length > 0 && this.state.sharedFiles.map((item, index) => {
                                return (
                                  <div key={index + "myfile"}>
                                    <Col
                                      id={index + "myfile"}
                                      style={{
                                        color: "black",
                                        borderRadius: "25px",
                                        padding: "20px"
                                      }}
                                      onMouseEnter={() => {
                                        document.getElementById(index + "myfile").style.background = "#ffbc4233"
                                      }}
                                      onMouseLeave={() => {
                                        document.getElementById(index + "myfile").style.background = "white"
                                      }}
                                    >
                                      {
                                        detectFileTypeExplorer(item.name) === "image" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <ModalImage src={IPFSgateway + item.cid} name={item.name} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                      {
                                        detectFileTypeExplorer(item.name) === "video" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <ModalVideo src={IPFSgateway + item.cid} name={item.name} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                      {
                                        detectFileTypeExplorer(item.name) === "audio" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <ModalAudio src={IPFSgateway + item.cid} name={item.name} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                      {
                                        detectFileTypeExplorer(item.name) === "pdf" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <PictureAsPdfIcon
                                            onClick={() => {
                                              window.open(IPFSgateway + item.cid, "_blank")
                                            }}
                                            style={{
                                              fontSize: "6rem"
                                            }} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                      {
                                        detectFileTypeExplorer(item.name) === "txt" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <ModalText src={IPFSgateway + item.cid} name={item.name} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                      {
                                        detectFileTypeExplorer(item.name) === "other" &&
                                        <div style={{
                                          textAlign: "center"
                                        }}>
                                          <CheckBoxOutlineBlankIcon
                                            onClick={() => {
                                              window.open(IPFSgateway + item.cid, "_blank")
                                            }}
                                            style={{
                                              fontSize: "6rem"
                                            }} />
                                          <p />
                                          <div>
                                            {
                                              item.name
                                            }
                                          </div>
                                        </div>
                                      }
                                    </Col>
                                  </div>
                                )
                              })
                          }
                        </Row>
                      </CardBody>
                    </Card>
                  </div>
                  {
                    // Wallet
                  }
                  <div hidden={this.state.menuSelector === 2 ? false : true}>
                    <Card style={{ height: "94vh", width: "70vw", background: "white" }}>
                      <div hidden={this.state.walletScreen === 0 ? false : true}>
                        <CardBody>
                          {
                            this.state.prices.length > 0 ?
                              <Row
                                md="2"
                                style={{
                                  height: "82vh",
                                  overflowX: 'hidden',
                                  overflowY: 'scroll',
                                }}>
                                {
                                  this.state.prices.map((price, index) => {
                                    return (
                                      <Col key={"price" + index} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}>
                                        <Card
                                          style={{
                                            margin: '10px',
                                            padding: '10px',
                                            width: '100%',
                                            borderColor: '#1b5eb5',
                                          }}>
                                          <Row md="3" style={{
                                            textAlign: "center"
                                          }}>
                                            <Col xs="4" style={{
                                              fontSize: '20px',
                                              fontWeight: 'bold',
                                            }}>{this.state.symbol[index]}
                                            </Col>
                                            <Col xs="4" style={{
                                              fontSize: '20px',
                                              fontWeight: 'bold',
                                            }}>
                                              <img alt="myimages" src={this.state.icons[index]} style={{
                                                width: '50px',
                                              }} />
                                            </Col>
                                            <Col xs="4" style={{
                                              fontSize: '20px',
                                              fontWeight: 'bold',
                                            }}>
                                              ${price}
                                            </Col>
                                          </Row>
                                        </Card>
                                      </Col>
                                    )
                                  })
                                }
                              </Row>
                              :
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: "82vh",
                                }}
                              ><Spinner style={{
                                color: "#1b5eb5",
                                width: "10vh",
                                height: "10vh"
                              }} />
                              </div>
                          }
                        </CardBody>
                      </div>
                      <div hidden={this.state.walletScreen === 1 ? false : true}>
                        <CardBody>
                          <>
                            <p />
                            <Row md="2">
                              <Col>
                                <h3 style={{
                                  textAlign: "center",
                                  border: "solid #1b5eb5 1px",
                                  borderRadius: "20px",
                                  padding: "25px"
                                }}>
                                  Fiat Account
                                </h3>
                                <div
                                  style={{
                                    marginTop: "5px",
                                    height: "69vh",
                                    overflow: "hidden"
                                  }}>
                                  {
                                    <Fiat ewallet={this.state.ewallet} />
                                  }
                                </div>
                              </Col>
                              <Col>
                                <h3 style={{
                                  textAlign: "center",
                                  border: "solid #1b5eb5 1px",
                                  borderRadius: "20px",
                                  padding: "25px"
                                }}>
                                  Crypto Account
                                </h3>
                                <div
                                  style={{
                                    marginTop: "5px",
                                    height: "69vh",
                                    overflow: "hidden"
                                  }}>
                                  {
                                    <Crypto balance={this.state.account.balance} address={this.state.account.ethAddress} />
                                  }
                                </div>
                              </Col>
                            </Row>
                            {
                              /*
   
                              {
                              this.state.nft.length > 0 &&
                              <>
                                <div style={{ paddingTop: "4px" }} />
                                <div>
                                  <button className='roundButton' style={{width: "100%", fontSize: "1.5rem", fontWeight: "bolder", height: "7vh" }} onClick={() => {
                                    if (this.state.accountSelector === 4) {
                                      this.setState({
                                        accountSelector: 0
                                      })
                                    }
                                    else {
                                      this.setState({
                                        accountSelector: 4
                                      })
                                    }
                                  }}>
                                    NFT Collection
                                  </button>
                                  <div
                                    hidden={this.state.accountSelector !== 4}
                                    style={{
                                      marginTop: "5px",
                                      maxHeight: "56.4vh",
                                    }}>
                                    {
                                      // <NFT nft={this.state.nft} />
                                    }
                                  </div>
                                </div>
                              </>
                            }
                            <div style={{ paddingTop: "4px" }} />
                            <div>
                              <button className='roundButton' style={{ width: "100%", fontSize: "1.5rem", fontWeight: "bolder", height: "7vh" }} onClick={() => {
                                if (this.state.accountSelector === 3) {
                                  this.setState({
                                    accountSelector: 0
                                  })
                                }
                                else {
                                  this.setState({
                                    accountSelector: 3
                                  })
                                }
                              }}>
                                Verify
                              </button>
                              <div
                                hidden={this.state.accountSelector !== 3}
                                style={{
                                  marginTop: "5px",
                                  maxHeight: "56.4vh",
                                }}>
                                {
                                  // <Verify />
                                }
                              </div>
                            </div>
   
                              */
                            }
                          </>
                        </CardBody>
                      </div>
                      {
                        this.state.walletScreen === 2 &&
                        <CardBody>
                          <Swap
                            ewallet={this.state.ewallet}
                            balance={this.state.account.balance}
                            address={this.state.account.ethAddress}
                          />
                        </CardBody>
                      }
                      <div hidden={this.state.walletScreen === 3 ? false : true}>
                        <CardBody style={{
                          height: "86vh",
                        }}>
                          <Cash />
                        </CardBody>
                      </div>
                      <div className='footer'>
                        <ButtonGroup style={{
                          width: '100%',
                          height: '8vh',
                        }}>
                          <Button style={
                            this.state.walletScreen !== 1 ? style1 : style2
                          }
                            onClick={() => this.setState({ walletScreen: 1 })}
                          >
                            <Row md="1">
                              <Col xs="12" style={{
                                marginTop: "-0.5vh"
                              }}>
                                <SwitchAccountIcon />
                              </Col>
                              <Col xs="12" style={{
                                marginTop: "-1vh"
                              }}>
                                <span style={{
                                  fontSize: '1rem',
                                }}>
                                  Accounts
                                </span>
                              </Col>
                            </Row>
                          </Button>
                          <Button style={
                            this.state.walletScreen !== 2 ? style1 : style2
                          } onClick={() => this.setState({ walletScreen: 2 })}>
                            <Row md="1">
                              <Col xs="12" style={{
                                marginTop: "-0.5vh"
                              }}>
                                <SwapVertIcon />
                              </Col>
                              <Col xs="12" style={{
                                marginTop: "-1vh"
                              }}>
                                <span style={{
                                  fontSize: '1rem',
                                }}>
                                  Swap
                                </span>
                              </Col>
                            </Row>
                          </Button>
                          <Button style={
                            this.state.walletScreen !== 3 ? style1 : style2
                          } onClick={() => this.setState({ walletScreen: 3 })}>
                            <Row md="1">
                              <Col xs="12" style={{
                                marginTop: "-0.5vh"
                              }}>
                                <MoneyIcon />
                              </Col>
                              <Col xs="12" style={{
                                marginTop: "-1vh"
                              }}>
                                <span style={{
                                  fontSize: '1rem',
                                }}>
                                  Cash Out
                                </span>
                              </Col>
                            </Row>
                          </Button>
                          <Button style={
                            this.state.walletScreen !== 0 ? style1 : style2
                          } onClick={() => this.setState({ walletScreen: 0 })}>
                            <Row md="1">
                              <Col xs="12" style={{
                                marginTop: "-0.5vh"
                              }}>
                                <CurrencyBitcoinIcon />
                              </Col>
                              <Col xs="12" style={{
                                marginTop: "-1vh"
                              }}>
                                <span style={{
                                  fontSize: '1rem',
                                }}>
                                  Feeds
                                </span>
                              </Col>
                            </Row>
                          </Button>
                        </ButtonGroup>
                      </div>
                    </Card>
                  </div>
                  {
                    // NFT's
                  }
                  <div hidden={this.state.menuSelector === 3 ? false : true}>
                    <Card style={{ height: "94vh", width: "70vw", background: "white" }}>
                      <CardHeader style={{ fontSize: "1.3rem" }}>
                        <Row>
                          <Col xs="2">
                            My NFT's
                          </Col>
                          <Col xs="2">
                            <Input
                              placeholder="NFT Name"
                              id="nameNFT"
                              type='text'
                              onChange={(e) => {
                                this.setState({
                                  nameNFT: e.target.value,
                                })
                              }}
                            />
                          </Col>
                          <Col xs="2">
                            <Input
                              placeholder="NFT description"
                              id="descNFT"
                              type='text'
                              onChange={(e) => {
                                this.setState({
                                  descNFT: e.target.value,
                                })
                              }}
                            />
                          </Col>
                          <Col xs="3">
                            <Input
                              id="fileNFTInput"
                              type='file'
                              onChange={async (e) => {
                                this.setState({
                                  fileNFT: e.target.files[0],
                                })
                              }}
                            />
                          </Col>
                          <Col xs="1" style={{
                            textAlign: "center"
                          }}>
                            <Tooltips info={"Uploaded to https://nft.storage/"} color="#ffbc42">
                              <InfoIcon />
                            </Tooltips>
                          </Col>
                          <Col xs="2">
                            <button
                              style={{
                                fontSize: "1.2rem",
                                padding: "4px 14px 2px",
                                width: "100%",
                                color: "white"
                              }}
                              className="myButton"
                              disabled={this.state.uploadButtonNFT || !(this.state.fileNFT ? true : false)}
                              onClick={async () => {
                                this.setState({
                                  uploadButtonNFT: true
                                }, async () => {
                                  await this.deployNFT()
                                  document.getElementById("fileNFTInput").value = null
                                  this.setState({
                                    fileNFT: null,
                                    uploadButtonNFT: false,
                                    nameNFT: "",
                                    descNFT: "",
                                    addressNFT: "",
                                    cidNFT: "",
                                  })
                                })
                              }}
                            >
                              Mint
                            </button>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Row md={4} style={{
                          height: "80vh",
                          overflowY: "scroll"
                        }}>
                          {
                            this.state.nft.length > 0 && this.state.nft.map((item, index) => {
                              return (
                                <Col key={"NFT" + index} style={{ color: "black", marginBottom: "50px" }}>
                                  <div style={{
                                    textAlign: "center"
                                  }}>
                                    <ModalNFT nft={item} address={this.state.account.ethAddress} />
                                    <p />
                                    <div>
                                      {
                                        item.name
                                      }
                                    </div>
                                  </div>
                                </Col>
                              )
                            })
                          }
                        </Row>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </>
        }
      </>
    );
  };
}

export default routerParams(withCookies(Main));