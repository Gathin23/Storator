import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

// 1. Get projectId
const projectId = '2e72c74431a877a44c348a86c109a817'

// 2. Set chains
const testnet = {
  chainId: 11155111,
  name: 'Sepolia Testnet',
  currency: 'SepoliaETH',
  explorerUrl: 'https://sepolia.etherscan.io/',
  rpcUrl: 'https://1rpc.io/sepolia'
}

// 3. Create a metadata object
const metadata = {
  name: 'Storator',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [testnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
