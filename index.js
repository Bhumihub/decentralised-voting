require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
app.use(
    fileUpload({
        extended:true
    })
)
app.use(express.static(__dirname));
app.use(express.json());
const path = require("path");
const { ethers } = require("ethers");


var port = 3000;

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const {abi} = require('./artifacts/contracts/Voting.sol/Voting.json');
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post("/vote", async (req, res) => {
    const index = req.body.vote;
    try {
        const tx = await contractInstance.vote(index);
        await tx.wait();
        res.send("Vote cast successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error casting vote");
    }
});

app.post("/add-candidate", async (req, res) => {
    const name = req.body.vote; // Candidate name
    try {
        const votingActive = await contractInstance.getVotingStatus();
        if (!votingActive) return res.send("Voting is finished");

        const tx = await contractInstance.addCandidate(name);
        await tx.wait();
        res.send("Candidate added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding candidate");
    }
});

app.listen(port, function () {
    console.log("App is listening on port 3000")
});