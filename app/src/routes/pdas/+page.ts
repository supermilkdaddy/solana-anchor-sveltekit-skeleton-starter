import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import { workspaceStore } from '$lib/stores/workspace-store';
import type { PageLoad } from "./$types";
import { get } from 'svelte/store';

console.log("/pdas PAGE.ts");

export const load = (async ({ fetch, params, setHeaders }) => {
  console.log("+PAGE.TS::params: ", params)

  // const SOLANA_ANCHOR_SVELTEKIT_SKELETON_STARTER_PROGRAM_ID = new anchor.web3.PublicKey(
  //   '7j6ARQdmgrJwEqgJDHC82nvwQX26qcDF79osU6M7kmui'
  // );

  // U: Moved to a +page.ts so can invalidateAll() to rerun load()
  // NOTE No longer need to rebuild Anchor since I have workspaceStore
  async function fetchLedgersFromClientWithAnchor() {
    if (!get(walletStore).publicKey) return
    if (!get(workspaceStore)) return

    const ledgersFromClientWithAnchor = await get(workspaceStore).program?.account.ledger.all();
    console.log('ledgersFromClientWithAnchor: ', ledgersFromClientWithAnchor);
    return ledgersFromClientWithAnchor;
  }

  return {
    pageLoadLedgersFromClientWithAnchor: fetchLedgersFromClientWithAnchor()
  }
}) satisfies PageLoad;


