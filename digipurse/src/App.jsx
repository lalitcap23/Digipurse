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
                    <div>

                        <h1 className='head-title'>you are back for those faucet 💦💦.</h1>
                        <WalletMultiButton />
                        <WalletDisconnectButton  />
                    </div>
                    {/* Airdrop Component */}
                    <Airdrop />
                    <br/>
                  <Button/>
                     
               </WalletModalProvider>
            </WalletProvider>
            
        </ConnectionProvider>
    );
}

export default App;
