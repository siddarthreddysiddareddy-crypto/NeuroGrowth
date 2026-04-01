"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, NETWORK_CHAIN_ID } from "../contracts/config";
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

  // Verify Network
  async function verifyNetwork(provider: ethers.BrowserProvider) {
    const network = await provider.getNetwork();
    if (Number(network.chainId) !== NETWORK_CHAIN_ID) {
      alert(`Please switch MetaMask to the local network (Chain ID: ${NETWORK_CHAIN_ID})!`);
      setStatus("Wrong network!");
      return false;
    }
    return true;
  }

  // Listen to MetaMask events
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          fetchBalance(accounts[0]);
          setStatus("Wallet connected!");
        } else {
          setWalletAddress("");
          setBalance("");
          setStatus("Wallet disconnected!");
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener?.("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener?.("chainChanged", handleChainChanged);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Connect Wallet
  async function connectWallet() {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const isCorrectNetwork = await verifyNetwork(provider);
      if (!isCorrectNetwork) return;

      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      await fetchBalance(accounts[0]);
      setStatus("Wallet connected!");
    } catch (error: any) {
      setStatus("❌ Connection failed: " + error.message);
    }
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
      
      const isCorrectNetwork = await verifyNetwork(provider);
      if (!isCorrectNetwork) {
        setLoading(false);
        return;
      }

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