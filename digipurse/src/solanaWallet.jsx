import React, { useState } from "react";
import { mnemonicToSeedSync } from "bip39"; // Use mnemonicToSeedSync instead of async version
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export default function Solana({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    // Function to add a new wallet based on the mnemonic and current index
    const addWallet = () => {
        try {
            // Step 1: Convert the mnemonic phrase into a seed
            const seed = mnemonicToSeedSync(mnemonic); // Convert mnemonic to seed
            console.log("Seed: ", seed.toString("hex"));

            // Step 2: Define a derivation path for Solana (BIP44 standard for Solana is m/44'/501'/0'/0')
            const path = `m/44'/501'/${currentIndex}'/0'`; // Using currentIndex to generate multiple wallets

            // Step 3: Derive the key from the seed using the derivation path
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            
            // Step 4: Generate secret key and keypair from the derived seed
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey; // Generate secret key
            const keypair = Keypair.fromSecretKey(secret); // Create Keypair from secret key

            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey]); // Store the public key

        } catch (error) {
            console.error("Error generating wallet:", error);
        }
    };

    return (
        <div>
            <h2>Create Solana Wallet Address</h2>
            <button onClick={addWallet}>Add Wallet</button>

            <div>
                {publicKeys.length > 0 ? (
                    publicKeys.map((publicKey, index) => (
                        <div key={index}>
                            Wallet {index + 1}: {publicKey.toBase58()}
                        </div>
                    ))
                ) : (
                    <p>No wallets generated yet.</p>
                )}
            </div>
        </div>
    );
}
