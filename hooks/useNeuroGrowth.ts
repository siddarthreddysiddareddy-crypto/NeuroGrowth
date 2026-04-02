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
  const [userBalance, setUserBalance] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

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
      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
            fetchBalance(accounts[0]);
            setStatus("Wallet connected!");
          }
        })
        .catch(console.error);

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          fetchBalance(accounts[0]);
          setStatus("Wallet connected!");
        } else {
          setWalletAddress("");
          setUserBalance("");
          setIsConnected(false);
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
      setIsConnecting(true);
      setError("");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const isCorrectNetwork = await verifyNetwork(provider);
      if (!isCorrectNetwork) {
          setIsConnecting(false);
          return;
      }

      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      await fetchBalance(accounts[0]);
      setStatus("Wallet connected!");
    } catch (err: any) {
      setError("❌ Connection failed: " + err.message);
      setStatus("❌ Connection failed: " + err.message);
    } finally {
      setIsConnecting(false);
    }
  }

  // Fetch Balance
  async function fetchBalance(address: string) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, provider);
      const bal = await contract.balanceOf(address);
      setUserBalance(ethers.formatUnits(bal, 18));
    } catch (e) {
      console.error("Error fetching balance:", e);
    }
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

  // Fund Campaign Shell
  async function fundCampaign(campaignId: string, amount: string) {
    if (!isConnected) {
      setError("Connect wallet first!");
      return;
    }
    try {
      setLoading(true);
      setStatus("Funding campaign...");
      // TODO: Replace with specific ABI call
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();
      // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);
      // const tx = await contract.fundCampaign(campaignId, ethers.parseUnits(amount, 18));
      // await tx.wait();
      
      console.log(`Mocking funding campaign ${campaignId} with ${amount} tokens.`);
      await new Promise(res => setTimeout(res, 1000));
      setStatus("✅ Campaign founded!");
    } catch (err: any) {
      setError("❌ Error: " + err.message);
      setStatus("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Stake Tokens Shell (converted to real transaction)
  async function stakeTokens(amount: string) {
    if (!isConnected || !walletAddress) {
      setError("Connect wallet first!");
      throw new Error("Connect wallet first!");
    }
    try {
      setIsPending(true);
      setError("");
      setStatus("Staking tokens...");
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);
      
      // We simulate staking by transferring to the contract address itself
      const tx = await contract.transfer(CONTRACT_ADDRESS, ethers.parseUnits(amount, 18));
      
      setStatus("Transaction initiated. Waiting for confirmation...");
      await tx.wait();
      
      setStatus("✅ Tokens staked!");
      await fetchBalance(walletAddress); // Refresh balance
    } catch (err: any) {
      setError("❌ Error: " + err.message);
      setStatus("❌ Error: " + err.message);
      throw err; // rethrow allowing callers to catch it
    } finally {
      setIsPending(false);
    }
  }

  return {
    walletAddress,
    userBalance,
    status,
    loading,
    isConnecting,
    isConnected,
    isPending,
    error,
    connectWallet,
    sendTokens,
    fetchBalance,
    fundCampaign,
    stakeTokens
  };
}