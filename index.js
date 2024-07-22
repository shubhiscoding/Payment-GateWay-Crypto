const { BrowserProvider, ethers } = require('ethers');

const { createWeb3Modal, defaultConfig } = require('@web3modal/ethers');
const projectId = '231bf253a5ade0e462452df1d078fe6f';

// 2. Set chains
const mainnet = {
  POLzk: {
    chainId: 2442,
    name: 'Polygon zkEVM Cardona Testnet',
    currency: 'ETH',
    explorerUrl: 'https://cardona-zkevm.polygonscan.com/',
    rpcUrl: 'https://polygon-zkevm-cardona.blockpi.network/v1/rpc/public'
  },
  BASE : {
    chainId: 84532,
    name: 'Base Sepolia Testnet',
    currency: 'ETH',
    explorerUrl: 'https://base-sepolia.blockscout.com/',
    rpcUrl:'https://base-sepolia.blockpi.network/v1/rpc/public'
  }
};

// 3. Create your application's metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // url must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
};

const addresses = {
  POLzk: "0x9C1f119b49c650b0789F36E43BEe257BD1f2cfef",
  BASE: "0x9C1f119b49c650b0789F36E43BEe257BD1f2cfef"
}

const handlePayment = async (amount, address, ntwrk) => {

  const details = mainnet[ntwrk];
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  auth: {
    email: false, // default to true
    socials: false,
    showWallets: true, // default to true
    walletFeatures: true // default to true
  },
  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: details.rpcUrl, // used for the Coinbase SDK
  defaultChainId: details.chainId, // used for the Coinbase SDK
  providerOptions: {
    injected: {
      display: {
        name: 'MetaMask',
        description: 'Connect with MetaMask'
      },
      package: null
    }
  }
});

// 5. Create a Web3Modal instance
const modal = createWeb3Modal({
  ethersConfig,
  chains: [details],
  projectId
});

const { open, selectedNetworkId } = modal.getState();
  
    const getProvider = async () => {
        if(selectedNetworkId !== details.chainId) {
            const chainId = details.chainId;
            await modal.switchNetwork(chainId);
        }
        const walletProvider = modal.getWalletProvider();
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const contractAddress = addresses[ntwrk];
        const contractABI = [
          "function pay(uint256 amnt, address reciver) public payable",
        ];
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
        const Amount = ethers.parseEther(amount.toString());
        const tx = await contract.pay(Amount, address, { value: Amount });
        await tx.wait();
        return tx;
    };

    const connectWallet = async () => {
        await modal.open();
    };

    if (!modal.getIsConnected()) {
        await connectWallet();
        while(!modal.getIsConnected()){
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    if (modal.getIsConnected()) {
        const tx = await getProvider();
        return tx;
    }
  };

module.exports = { handlePayment };