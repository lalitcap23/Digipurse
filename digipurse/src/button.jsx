import React, { useState } from 'react';
import { generateMnemonic } from 'bip39';
import ShimmerButton from "./components/ui/shimmer-button"

const MnemonicInput = () => {
    const [mnemonic, setMnemonic] = useState("");

    const handleChange = (event) => {
        setMnemonic(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted Mnemonic:", mnemonic);
        // Add your logic to use the mnemonic here
    };

    const handleGenerateMnemonic = async () => {
        const mn = await generateMnemonic();
        setMnemonic(mn);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Mnemonic:
                    <input 
                        type="text" 
                        value={mnemonic} 
                        onChange={handleChange} 
                        placeholder="Type your mnemonic here" 
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
           <ShimmerButton onClick={handleGenerateMnemonic} className='text-white'>Create Seed Phrase</ShimmerButton>
            <p>Generated Mnemonic: {mnemonic}</p>
            {/* <input type="text" value={mnemonic}></input> */}
        </div>
    );
};

export default MnemonicInput;
