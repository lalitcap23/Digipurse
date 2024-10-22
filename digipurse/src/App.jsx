import React, { useMemo, useState } from 'react';
import './App.css'; 

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import Tran from './tran';
import Navbar from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SolanaBal from './solanaBal';
import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './airdrop';  
import Button from './button';

function App() {
    const [mnemonic, setMnemonic] = useState(""); 

    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new UnsafeBurnerWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}> 
            <WalletProvider wallets={wallets} autoConnect> 
                <WalletModalProvider>
                    <Navbar />
                    <div>
                        <h1 className='head-title'>You are back for those faucets.</h1>
                        <h2>**Digipurse** is a web-based Solana wallet designed for seamless cryptocurrency management. Users can easily access free devnet SOL, enabling them to explore and test the Solana blockchain without any costs. With Digipurse, you can effortlessly transfer SOL to any address, making it an ideal tool for developers and enthusiasts looking to interact with the Solana ecosystem. Enjoy a user-friendly interface and secure transactions while diving into the world of decentralized finance!</h2>
                        <WalletMultiButton />
                        <WalletDisconnectButton />
                    </div>
                    
                    {/* Airdrop Component */}
                    <Airdrop />
                    <br/>
                    <Button />
                    <Tran />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;
