import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import wallet from "../turbin3-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("3S7HzzRpzCwRFpUuWeELaFaSayPz7Jkjyz3gPwx4PL1u");

// Recipient address
const to = new PublicKey("AhEXZ5i3FVGaw7uTxvFvc65XGhy3hnEboD8mxkD91HBw");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it

        const source_ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
        );

        // Get the token account of the toWallet address, and if it does not exist, create it

        const to_ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(
            connection,
            keypair,
            source_ata.address,
            to_ata.address,
            keypair,
            10e6,
        );

        console.log("Tx: ", tx);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();
