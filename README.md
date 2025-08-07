# 🗳️ Decentralized Voting DApp
A secure, transparent, and tamper-proof decentralized application for conducting online elections using Ethereum, Solidity, and Web3.js.

## 📌 Overview
This DApp enables a decentralized voting system where:

- ✅ Only verified voters can vote.
- ✅ Each user can vote only once.
- ✅ Votes are stored securely on the Ethereum blockchain.
- ✅ Results are immutable and transparent to all.

## 🚀 Features
- ✅ Voter Registration  
- ✅ One-vote-per-user logic  
- ✅ Real-time vote count display  
- ✅ Immutable & transparent vote storage  
- ✅ Smart Contract-based validation  
- ✅ Simple, responsive Web3 UI  
- ✅ MetaMask wallet integration

## 🧪 How to Run

### Prerequisites
- MetaMask
- Node.js
- Ganache or any Ethereum testnet

### Steps
1. Clone this repo:
```bash
git clone https://github.com/Bhumihub/decentralised-voting.git
### Navigate into the project

```bash
cd decentralised-voting
Compile and Deploy the Smart Contract
✅ Option 1: Use Remix IDE
Open Voting.sol in Remix

Compile and deploy using "Injected Web3" (connected to MetaMask)

✅ Option 2: Using Hardhat (if configured)
bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
🚀 Run the Frontend
bash
cd frontend
npx http-server .
Now open your browser and connect MetaMask to the same network

