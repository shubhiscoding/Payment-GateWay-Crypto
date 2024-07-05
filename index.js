// index.js
const { ethers } = require('ethers');

const handlePayment = async (amount, address) => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        
        const signer = await provider.getSigner();
        const contractAddress = '0x9C1f119b49c650b0789F36E43BEe257BD1f2cfef';
        const contractABI = [
            "function pay(uint256 amnt, address reciver) public payable",
        ];
        const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );
        
        const Amount = ethers.parseEther(amount.toString());
        const tx = await contract.pay(Amount, address, { value: Amount });
        await tx.wait();
        console.log(tx);            
    } catch (error) {
        console.log('Error', error.message);
    }
};

module.exports = { handlePayment };
