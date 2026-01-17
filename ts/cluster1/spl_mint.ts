import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "../turbin3-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("3S7HzzRpzCwRFpUuWeELaFaSayPz7Jkjyz3gPwx4PL1u");

(async () => {
  try {
    // Create an ATA
    // const ata = ???
    // console.log(`Your ata is: ${ata.address.toBase58()}`);

    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey,
    );
    console.log(`ATA: ${ata.address.toBase58()}`);

    // Mint to ATA
    // const mintTx = ???
    // console.log(`Your mint txid: ${mintTx}`);

    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair.publicKey,
      token_decimals,
    );
    console.log(`mint tx: ${mintTx}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
