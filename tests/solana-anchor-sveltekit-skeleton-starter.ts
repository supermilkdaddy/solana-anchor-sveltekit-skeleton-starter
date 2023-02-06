import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaAnchorSveltekitSkeletonStarter } from "../target/types/solana_anchor_sveltekit_skeleton_starter";


function shortKey(key: anchor.web3.PublicKey) {
  // For condensed logs
  return key.toString().substring(0, 8);
}

async function getStringForInstruction(
  operation: number,
  operation_value: number
) {
  if (operation == 0) {
    return "reset the example";
  } else if (operation == 1) {
    return `add: ${operation_value}`;
  } else if (operation == 2) {
    return `subtract: ${operation_value}`;
  } else if (operation == 3) {
    return `multiply by: ${operation_value}`;
  }
}


describe("solana-anchor-sveltekit-skeleton-starter", () => {
  // Configure the client to use the local cluster.
  // NOTE Grab provider as const so we have access to its methods
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaAnchorSveltekitSkeletonStarter as Program<SolanaAnchorSveltekitSkeletonStarter>;
  console.log('programId: ', program.programId.toBase58()) // 7j6ARQdmgrJwEqgJDHC82nvwQX26qcDF79osU6M7kmui

  async function generateKeypair() {
    // Ensure that new wallet keypair has enough SOL
    let keypair = anchor.web3.Keypair.generate();
    await provider.connection.requestAirdrop(
      keypair.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    // Sleep for devnet
    await new Promise((resolve) => setTimeout(resolve, 3 * 1000));
    return keypair;
  }

  async function derivePda(color: string, pubkey: anchor.web3.PublicKey) {
    // UPDATE 8/26 - Apparently if you set Anchor.toml > seeds = true, then Anchor
    // will auto-derive your PDA for you: await program.methods.initialize().pubkeys().myPdaAccount
    // NOTE This is key! We can derive PDA WITHOUT hitting our program!
    // Then we can use this PDA address in our functions as a check to see
    // whether there is a ledger account at this PDA address.
    // Then, MOST IMPORTANTLY, we can fetch the account's data from the CLIENT
    // and use its data.
    // NOTE pubkey is actually provider.wallet.publicKey
    let [pda, _] = await anchor.web3.PublicKey.findProgramAddress(
      [pubkey.toBuffer(), Buffer.from("_"), Buffer.from(color)],
      program.programId // The program that we want to OWN the PDA
    );

    return pda;
  }

  async function createLedgerAccount(
    color: string,
    pda: anchor.web3.PublicKey,
    wallet: anchor.web3.Keypair
  ) {
    // Calls the program's on-chain create_ledger instruction function
    // to create a ledger account LOCATED at our generated PDA address!
    // NOTE This requires same args i.e., Context, color, system
    // NOTE We're technically creating a ledger account located at
    // this PDA address!
    await program.methods
      .createLedger(color)
      .accounts({
        // Q: Do I use snake_case or camelCase?
        // NOTE Tutorial used camelCase even though it's snake_case in program
        // A: Looks like I use camelCase...
        ledgerAccount: pda,
        wallet: wallet.publicKey,
        // NOTE Anchor automatically adds System Program (and other programs if required)
      })
      .signers([wallet])
      .rpc();
  }

  async function modifyLedgerAccount(
    color: string,
    newBalance: number,
    wallet: anchor.web3.Keypair
  ) {
    console.log("------------------------------------");
    // 1. Retrieve the PDA using helper
    // NOTE Don't pass pda address. Just pass color
    let data; // Is type Ledger
    let pda = await derivePda(color, wallet.publicKey);

    // 2. Try to retreive PDA account data if it exists
    console.log(
      `Checking if account ${shortKey(pda)} exists for color: ${color}...`
    );
    try {
      // NOTE We're technically seeing if our PDA address has a
      // ledger account at its location (address)
      data = await program.account.ledger.fetch(pda);
      console.log(`Account already exists!`);
    } catch (e) {
      // console.log(e);
      console.log(`Account ${shortKey(pda)} does NOT exist!`);
      console.log("Creating account...");
      // 1. Create account using helper that calls program instruction
      await createLedgerAccount(color, pda, wallet);
      // 2. Retrieve account data
      data = await program.account.ledger.fetch(pda);
    }

    console.log(
      `SUCCESS! Wallet: ${wallet.publicKey} -- PDA: ${shortKey(pda)} `
    );
    console.log("Our PDA has a ledger account with data:\n");
    console.log(`    Color: ${data.color}   Balance: ${data.balance}`);
    console.log(
      `Modifying balance of ${data.color} from ${data.balance} to ${newBalance}`
    );

    // 3. Make our modifications to the account using on-chain program function
    // NOTE This is another program function instruction
    await program.methods
      .modifyLedger(newBalance)
      .accounts({
        ledgerAccount: pda,
        wallet: wallet.publicKey,
      })
      .signers([wallet])
      .rpc();

    // 4. Retrieve the updated data one last time
    data = await program.account.ledger.fetch(pda);
    // console.log(`Updated data for account located at:`);
    console.log(
      `UPDATED! Wallet: ${shortKey(wallet.publicKey)} -- PDA: ${shortKey(pda)} `
    );
    console.log(`    Color: ${data.color}   Balance: ${data.balance}`);
    console.log("Successfully modified ledger account!");
  }

  async function modifyLedgerAccountWithInstructionData(
    color: string,
    operation: number,
    operation_value: number,
    // operationValue: number,
    wallet: anchor.web3.Keypair
  ) {
    console.log("------------------------------------");
    // 1. Retrieve the PDA using helper
    // NOTE Don't pass pda address. Just pass color
    let data; // Is type Ledger
    let pda = await derivePda(color, wallet.publicKey);

    // 2. Try to retreive PDA account data if it exists
    console.log(
      `Checking if account ${shortKey(pda)} exists for color: ${color}...`
    );
    try {
      // NOTE We're technically seeing if our PDA address has a
      // ledger account at its location (address)
      data = await program.account.ledger.fetch(pda);
      console.log(`Account already exists!`);
    } catch (e) {
      // console.log(e);
      console.log(`Account ${shortKey(pda)} does NOT exist!`);
      console.log("Creating account...");
      // 1. Create account using helper that calls program instruction
      await createLedgerAccount(color, pda, wallet);
      // 2. Retrieve account data
      data = await program.account.ledger.fetch(pda);
    }

    console.log(
      `SUCCESS! Wallet: ${wallet.publicKey} -- PDA: ${shortKey(pda)} `
    );
    console.log("Our PDA has a ledger account with data:\n");
    console.log(`    Color: ${data.color}   Balance: ${data.balance}`);

    // 3. Make our modifications to the account using on-chain program function
    // NOTE This is another program function instruction
    // Q: Need to pass data: LedgerInstructions by building
    // the BufferLayout for the struct (I think...)???
    // A: WRONG! Use IDL generated Types!
    // const ledgerInstructions: Buffer = await createLedgerInstructionsBuffer(
    //   operation,
    //   operation_value
    //   // operationValue
    // );

    console.log(
      `We're going to ${await getStringForInstruction(
        operation,
        operation_value
        // operationValue
      )}`
    );

    // const instruction = new anchor.web3.TransactionInstruction({
    //   keys: [{ pubkey: pda, isSigner: false, isWritable: true }],
    //   program.programId,
    //   data: ledgerInstructions,
    // });

    // Q: How do I pass instructions data with Anchor?
    // Could be a serialization issue since I'm using Buffer and Borsh:
    // REF: https://discord.com/channels/889577356681945098/889577399308656662/996883609787056139
    // Suggested something like:
    // Instruction {
    //    data: LedgerInstructions { ... }.data(),
    //    program_id: ...,
    //    accounts: ...
    // }
    await program.methods
      // .modifyLedgerWithInstructionData(ledgerInstructions) // Q: Does this match data: LedgerInstructions?
      // Q: Is Buffer the right type for this when using Anchor?
      // REF: Check out the tic-tac-toe tests for the Tile (they pass object directly!)
      // A: NO! Passes without using the Buffer! Looks like Anchor's generated IDL does
      // the job for us!
      .modifyLedgerWithInstructionData({
        operation: operation,
        operationValue: operation_value,
      }) // MUST match the IDL type for LedgerInstructions
      .accounts({
        ledgerAccount: pda,
        wallet: wallet.publicKey,
      })
      .signers([wallet])
      .rpc();

    // 4. Retrieve the updated data one last time
    data = await program.account.ledger.fetch(pda);
    // console.log(`Updated data for account located at:`);
    console.log(
      `UPDATED! Wallet: ${shortKey(wallet.publicKey)} -- PDA: ${shortKey(pda)} `
    );
    console.log(`    Color: ${data.color}   Balance: ${data.balance}`);
    console.log("Successfully modified ledger account!");
  }

  it("An example of PDAs in action", async () => {
    // Q: Is this new keypair essentially representing another
    // wallet???? Which is then used to create/modify ledger accounts?
    // A: YES! We need a Keypair (Wallet) to sign these transactions,
    // so this is a quick/easy way to simulate multiple users.
    // const testKeypair1 = await generateKeypair();
    // await modifyLedgerAccount("red", 2, testKeypair1);
    // await modifyLedgerAccount("red", 4, testKeypair1);
    // await modifyLedgerAccount("blue", 3, testKeypair1);

    // const testKeypair2 = await generateKeypair();
    // await modifyLedgerAccount("red", 3, testKeypair2);
    // await modifyLedgerAccount("green", 5, testKeypair2);

    const testKeypair3 = await generateKeypair();
    // Create/init and change balance to 1
    await modifyLedgerAccount("red", 1, testKeypair3);
    // Add 3 to 1, so => 4
    await modifyLedgerAccountWithInstructionData("red", 1, 3, testKeypair3);
    // Q: What happens if balance default is 0? Should get new balance of 1...
    await modifyLedgerAccountWithInstructionData("blue", 1, 1, testKeypair3);
  });

});
