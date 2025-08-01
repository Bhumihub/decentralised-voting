let WALLET_CONNECTED = "";
let provider, signer, contractInstance;

const contractAddress = "0xF4aa0E1305c93CB2c7f05FBa621442fedE2c3A66";
const contractAbi = [
    {
        "inputs": [
            { "internalType": "string[]", "name": "_candidateNames", "type": "string[]" },
            { "internalType": "uint256", "name": "_durationInMinutes", "type": "uint256" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }],
        "name": "addCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "candidates",
        "outputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "uint256", "name": "voteCount", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllVotesOfCandiates",
        "outputs": [
            {
                "components": [
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "uint256", "name": "voteCount", "type": "uint256" }
                ],
                "internalType": "struct Voting.Candidate[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getRemainingTime",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_candidateIndex", "type": "uint256" }],
        "name": "getVotesOfCandiate",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getVotingStatus",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_candidateIndex", "type": "uint256" }],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "voters",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "votingEnd",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "votingStart",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
];

const initProvider = () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
};

const connectToMetaMask = async () => {
    const notif = document.getElementById("metamask-status") || document.getElementById("metamasknotification");
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        WALLET_CONNECTED = accounts[0];
        window.currentAccount = WALLET_CONNECTED; // ✅ fix for global account reference
        initProvider();
        notif.innerHTML = "✅ Connected to MetaMask";
    } catch (err) {
        notif.innerText = "❌ Failed to connect MetaMask: " + err.message;
    }
};

const addVote = async () => {
    const voteStatus = document.getElementById("voteStatus");
    const index = parseInt(document.getElementById("voterIndex").value);
    
    if (isNaN(index)) {
        voteStatus.innerText = "❌ Invalid voter index!";
        return;
    }

    try {
        const tx = await contractInstance.vote(index);
        await tx.wait(); // Wait for confirmation
        voteStatus.innerText = "✅ Vote cast successfully!";
    } catch (err) {
        console.error("Vote Error:", err);
        voteStatus.innerText = "❌ Error casting vote: " + err.message;
    }
};

const checkVotingStatus = async () => {
    const votedStatus = document.getElementById("votedStatus");

    try {
        const hasVoted = await contractInstance.voters(window.currentAccount);
        if (hasVoted) {
            votedStatus.innerText = "🗳️ You have already voted.";
        } else {
            votedStatus.innerText = "❌ You have not voted yet.";
        }
    } catch (err) {
        votedStatus.innerText = "❌ Error checking status: " + err.message;
    }
};

const getAllCandidates = async () => {
    const tableBody = document.querySelector("#myTable tbody");
    const output = document.getElementById("p3");
    try {
        const candidates = await contractInstance.getAllVotesOfCandiates();
        tableBody.innerHTML = "";
        candidates.forEach((cand, i) => {
            const row = `<tr><td>${i}</td><td>${cand.name}</td><td>${cand.voteCount}</td></tr>`;
            tableBody.innerHTML += row;
        });
        output.innerText = "✅ Candidates listed below.";
    } catch (err) {
        output.innerText = "❌ Error fetching candidates: " + err.message;
    }
};

const addCandidate = async (e) => {
    e.preventDefault(); // prevent form reload

    const nameInput = document.getElementById("candidateName");
    const name = nameInput.value.trim();
    const statusMsg = document.getElementById("votingStatus");

    if (!name) {
        statusMsg.innerText = "❌ Candidate name cannot be empty.";
        return;
    }

    try {
        const tx = await contractInstance.addCandidate(name);
        await tx.wait();
        statusMsg.innerText = "✅ Candidate added successfully!";
        nameInput.value = "";
    } catch (err) {
        statusMsg.innerText = "❌ " + err.message;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("connectButton")?.addEventListener("click", connectToMetaMask);
    document.querySelector("button[onclick='connectMetamask()']")?.addEventListener("click", connectToMetaMask);
    document.querySelector("button[onclick='getAllCandidates()']")?.addEventListener("click", getAllCandidates);
    document.getElementById("addCandidateForm")?.addEventListener("submit", addCandidate);

    window.addVote = addVote;
    window.voteStatus = document.getElementById("voteStatus");
    window.checkVotingStatus = checkVotingStatus;
});
