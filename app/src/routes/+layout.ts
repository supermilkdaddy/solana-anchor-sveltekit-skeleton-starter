// import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
// import { Connection } from '@solana/web3.js';
// import * as anchor from '@project-serum/anchor';
// import type { LayoutLoad } from "./$types";
// import { IDL } from "../idl/solana_anchor_sveltekit_skeleton_starter";
// import { get } from 'svelte/store';


// // Q: Is there where tRPC+Zod come into play to check types at runtime (something TS can't do)?
// // U: Wes Bos on TS 'satisfies': https://youtu.be/ODZKZ9sGRAE
// // U: Could consider Zod Schema or first define type guard and use 'typeof'
// // operator to infer TS type from runtime definition: 
// // REF: https://medium.com/@wujido20/runtime-types-in-typescript-5f74fc9dc6c4
// // NOTE 'satisfies' does NOT give/assign the Type, but gives better intellisense
// // NOTE load: LayoutLoad vs. load() satisfies LayoutLoad
// // -- load: LayoutLoad doesn't know what all the properties, etc. will be so not as strict
// // -- load() satisfies LayoutLoad better for stricter typing and intellisense
// export const load = (async ({ fetch, params, setHeaders }) => {
//   // console.log("+LAYOUT.TS::params: ", params)
//   // Q: What are the Typing differences if I DON'T use server/http?
//   // Meaning, use the Anchor program to directly fetch here from client?
//   // A: Data is fully typed!
//   // Q: Do I have access to workspaceStore & walletStore stores?
//   // A: NO! Don't have access to walletStore & workspaceStore in layout.ts!
//   // A: BUT, can rebuild Anchor Program and retain TS Types!
//   const SOLANA_ANCHOR_SVELTEKIT_SKELETON_STARTER_PROGRAM_ID = new anchor.web3.PublicKey(
//     '7j6ARQdmgrJwEqgJDHC82nvwQX26qcDF79osU6M7kmui'
//   );

//   const connection = new Connection("http://localhost:8899", "confirmed"); // Works
//   const program = new anchor.Program(IDL, SOLANA_ANCHOR_SVELTEKIT_SKELETON_STARTER_PROGRAM_ID, {
//     connection: connection
//   }); // Works!

//   async function fetchLedgersFromClientWithAnchor() {
//     if (!get(walletStore).publicKey) return

//     const ledgersFromClientWithAnchor = await program.account.ledger.all();
//     console.log('ledgersFromClientWithAnchor: ', ledgersFromClientWithAnchor);
//     return ledgersFromClientWithAnchor;
//   }

//   return {
//     layoutLoadLedgersFromClientWithAnchor: fetchLedgersFromClientWithAnchor()
//   }
// }) satisfies LayoutLoad;

