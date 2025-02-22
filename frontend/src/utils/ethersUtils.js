// src/utils/ethersUtils.js
import { ethers } from "ethers";
const { Web3Provider } = require("ethers");

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0xYourContractAddressHere";

// Replace with your contract ABI (generated by Hardhat)
const CONTRACT_ABI = [
  // Example ABI entries
  "function issueCertificate(string memory studentName, string memory institutionName, bytes32 certificateHash) external",
  "function validateCertificate(bytes32 certificateHash) external view returns (bool)"
];

export async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      return signer;
    } catch (error) {
      console.error("User rejected account access:", error);
    }
  } else {
    console.error("MetaMask not installed");
  }
}

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}