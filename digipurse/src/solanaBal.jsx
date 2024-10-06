// WalletBalance.js
import React, { useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";

export default function WalletBalance({ publicKey }) {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch wallet balance
    const checkBalance = async () => {
        setLoading(true);
        setError(null);
        try {
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            const balance = await connection.getBalance(publicKey); // Get the balance in lamports
            setBalance(balance / 1e9); // Convert lamports to SOL
        } catch (err) {
            setError("Error fetching balance: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Wallet Balance Checker</h2>
            <button onClick={checkBalance}>Check Balance</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {balance !== null && (
                <p>
                    Balance: <strong>{balance} SOL</strong>
                </p>
            )}
        </div>
    );
}
