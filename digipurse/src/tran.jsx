import React, { useState } from 'react';
import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

const SolanaTransfer = () => {
  // State variables for input
  const [recipientPublicKey, setRecipientPublicKey] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  // hard coded ..
  const senderPrivateKey = [155,138,218,220,3,45,141,227,230,219,183,83,222,102,10,52,241,191,225,84,144,72,210,6,243,84,209,186,34,190,28,98,34,136,186,98,106,157,203,185,203,35,66,252,145,30,48,10,42,60,41,204,17,110,60,193,33,135,81,189,79,162,4,24];

  // Function to handle SOL transfer
  const handleTransfer = async () => {
    setStatus('Processing...');

    try {
      // Connect to Solana Devnet
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

      // Load the sender's wallet from the private key
      const sender = Keypair.fromSecretKey(Uint8Array.from(senderPrivateKey));

      // Convert recipient public key string to PublicKey type
      const recipient = new PublicKey(recipientPublicKey);

      // Convert SOL amount to lamports (1 SOL = 1 billion lamports)
      const amountInLamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      // Create a transaction to transfer SOL
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: sender.publicKey,
          toPubkey: recipient,
          lamports: amountInLamports,
        })
      );

      // Send and confirm the transaction
      const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

      setStatus(`Transaction successful! Signature: ${signature}`);
    } catch (error) {
      console.error('Transaction failed:', error);
      setStatus(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Solana Transfer</h2>

      <div>
        <label>
          Recipient Public Key:
          <input
            type="text"
            value={recipientPublicKey}
            onChange={(e) => setRecipientPublicKey(e.target.value)}
            placeholder="Enter recipient public key"
          />
        </label>
      </div>

      <div>
        <label>
          Amount (in SOL):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in SOL"
          />
        </label>
      </div>

      <button onClick={handleTransfer}>Transfer SOL</button>

      <div>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default SolanaTransfer;
