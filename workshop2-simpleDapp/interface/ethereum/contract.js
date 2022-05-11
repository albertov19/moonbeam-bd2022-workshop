import web3 from "./web3.js";
const ContractInterface = require("./abi/Contract.json");
const ethers = require("ethers");

const ContractInstance = (address) => {
  return new ethers.Contract(address, ContractInterface.abi, web3().getSigner());
};

export default ContractInstance;
