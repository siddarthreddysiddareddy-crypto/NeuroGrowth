"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../contracts/config";
import ABI from "../contracts/NeuroGrowthToken.json";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useNeuroGrowth() {

  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Connect Wallet
  async function connectWallet() {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask!");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setWalletAddress(accounts[0]);
    await fetchBalance(accounts[0]);
    setStatus("Wallet connected!");
  }

  // Fetch Balance
  async function fetchBalance(address: string) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, provider);
    const bal = await contract.balanceOf(address);
    setBalance(ethers.formatUnits(bal, 18));
  }

  // Send Tokens
  async function sendTokens(recipient: string, amount: string) {
    if (!walletAddress) {
      setStatus("Connect wallet first!");
      return;
    }
    try {
      setLoading(true);
      setStatus("Sending...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);
      const value = ethers.parseUnits(amount, 18);
      const tx = await contract.transfer(recipient, value);
      setStatus("Waiting for confirmation...");
      await tx.wait();
      setStatus("✅ Transaction confirmed!");
      await fetchBalance(walletAddress);
    } catch (error: any) {
      setStatus("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    walletAddress,
    balance,
    status,
    loading,
    connectWallet,
    sendTokens,
    fetchBalance
  };
}