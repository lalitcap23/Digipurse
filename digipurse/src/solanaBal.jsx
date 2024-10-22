import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const SolanaBalance = ({ publicKey }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // Connect to the Solana mainnet or devnet
        const connection = new Connection('https://api.mainnet-beta.solana.com');

        // Create a PublicKey object from the provided string
        const pubKey = new PublicKey(publicKey);

        // Fetch the balance
        const balanceInLamports = await connection.getBalance(pubKey);

        // Convert lamports to SOL (1 SOL = 1e9 lamports)
        const balanceInSOL = balanceInLamports / 1e9;

        setBalance(balanceInSOL);
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [publicKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Wallet Balance</h3>
      {balance !== null ? (
        <p>Balance: {balance} SOL</p>
      ) : (
        <p>Unable to fetch balance</p>
      )}
    </div>
  );
};

export default SolanaBalance;
