<script lang="ts">
	import * as anchor from '@project-serum/anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { workspaceStore } from '$lib/stores/workspace-store';
	import { toastStore } from '@skeletonlabs/skeleton';
</script>

<!-- Basic Form Layout -->
<div class="card">
	<slot name="form-header">
		<header class="card-header space-y-4">
			<h2>Create Ledger</h2>
			<p>
				Each ledger account is saved inside a PDA with a account structure of <code
					>color: string, balance: number</code
				>
				and with unique <code>seeds</code> to later fetch and modify account data.
			</p>
		</header>
	</slot>

	<div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
		<form class="space-y-4">
			<slot name="form-content">
				<label for="color">
					<span>Color</span>
					<input class="input" type="text" id="color" minlength="2" required />
				</label>

				<button class="btn variant-ringed-primary" type="submit">
					<span>💀</span>
					<span>Create Ledger</span>
					<span>🦴</span>
				</button>
			</slot>
		</form>
	</div>
</div>
