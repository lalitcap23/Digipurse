import React, { useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletPublicKeyError } from '@solana/wallet-adapter-base';

const Airdrop = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const wallet = useWallet();

    const handleAirdrop = useCallback(async () => {
        if (publicKey) {
            try {
                const signature = await connection.requestAirdrop(publicKey, 1000);
                await connection.confirmTransaction(signature, 'confirmed');
                alert('Devnet has been successfully sent to the connect wallet  ');
            } catch (err) {
                console.error(err);
                alert(' server is not free try again');
            }
        } else {    
            alert('Connect your wallet first!');
        }
    }, [publicKey, connection]);

    return (
        <div>
            <button onClick={handleAirdrop} disabled={!publicKey}>
                <button>Airdrop 0.01 SOL</button>
            </button>
        </div>
    );
};

export default Airdrop;
