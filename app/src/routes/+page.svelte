<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { workspaceStore } from '$lib/stores/workspace-store';
	import { balanceStore } from '$lib/stores/balance-store';
	import RequestAirdrop from '$lib/components/wallet/RequestAirdrop.svelte';
	import type { PublicKey } from '@solana/web3.js';

	$: $walletStore.connected &&
		balanceStore.getUserSOLBalance($walletStore.publicKey as PublicKey, $workspaceStore.connection);
</script>


<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center">
    <h1 class="gradient-heading">Solana+Anchor+Sveltekit+Skeleton</h1>

      <RequestAirdrop />

      {#if $walletStore?.connected}
        <p>SOL Balance: {($balanceStore.balance || 0).toLocaleString()}</p>
        <!-- <h4>SOL Balance: {($balanceStore.balance || 0).toLocaleString()}</h4> -->
      {/if}

  </div>
</div>
