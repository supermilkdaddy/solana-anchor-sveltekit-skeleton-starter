<script lang="ts">
	import * as anchor from '@project-serum/anchor';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { workspaceStore } from '$lib/stores/workspace-store';
	import { toastStore } from '@skeletonlabs/skeleton';

	export let headerText: string;
	export let headerSubText: string;
</script>

<div class="page-container space-y-10 p-4">
	<slot name="page-container-header">
		<header class="space-y-4">
			<h1 class="gradient-heading">{headerText}</h1>
			<p>{headerSubText}</p>
		</header>
	</slot>

	<!-- Single Form Card -->
	<slot name="page-container-content">
		<div class="card">
			<header class="card-header space-y-4">
				<h2>Create Ledger</h2>
				<p>
					Each ledger account is saved inside a PDA with a account structure of <code
						>color: string, balance: number</code
					>
					and with unique <code>seeds</code> to later fetch and modify account data.
				</p>
			</header>
			<div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
				<form class="space-y-4">
					<label for="color">
						<span>Color</span>
						<input class="input" type="text" id="color" minlength="2" required />
					</label>

					<button class="btn variant-ringed-primary" type="submit">
						<span>💀</span>
						<span>Create Ledger</span>
						<span>🦴</span>
					</button>
				</form>
			</div>
		</div>

		<!-- Split Two Columns Forms -->
		<section class="grid grid-cols-2 gap-4">
			<div class="card">
				<header class="card-header space-y-4">
					<h2>Left Form</h2>
					<p>Pass wallet address for <code>seed</code></p>
				</header>
				<form class="p-4 space-y-4">
					<label for="color">
						<span>Color</span>
						<input class="input" type="text" id="color" minlength="2" required />
					</label>

					<label for="seed">
						<span>Seed</span>
						<input class="input" type="text" id="seed" minlength="2" required />
					</label>

					<button class="btn variant-filled-accent" type="submit">
						<span>💀</span>
						<span>Get Ledger</span>
						<span>🦴</span>
					</button>
				</form>
			</div>

			<div class="card">
				<header class="card-header space-y-4">
					<h2>Right Form</h2>
					<p>Enter new balance amount</p>
				</header>
				<form class="p-4 space-y-4">
					<label for="color">
						<span>Color</span>
						<input class="input" type="text" id="color" minlength="2" required />
					</label>

					<label for="new-balance">
						<span>New Balance</span>
						<input class="input" type="text" id="new-balance" minlength="2" required />
					</label>

					<button class="btn variant-filled-surface">
						<span>💀</span>
						<span>Modify Ledger</span>
						<span>🦴</span>
					</button>
				</form>
			</div>
		</section>

		<!-- Single Form Card -->
		<div class="card">
			<header class="card-header space-y-4">
				<h2>Bottom Form</h2>
				<p>
					This uses custom program instructions (<code>LedgerInstructions</code>), which allows user
					to perform different computational operations on the current ledger account balance.
				</p>
			</header>
			<div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
				<form class="space-y-4">
					<label for="color">
						<span>Color</span>
						<input class="input" type="text" id="color" minlength="2" required />
					</label>

					<label for="operation">
						<span>Operation</span>
						<select class="select" name="operation" id="operation">
							<option value="1" selected>+</option>
							<option value="2">-</option>
							<option value="3">*</option>
							<option value="4">Reset</option>
						</select>
					</label>

					<label for="operation-value">
						<span>Operation Value</span>
						<input class="input" type="text" id="operation-value" minlength="2" required />
					</label>

					<button class="btn variant-filled-primary" type="submit">
						<span>💀</span>
						<span>Modify w/ Instructions</span>
						<span>🦴</span>
					</button>
				</form>
			</div>
		</div>
	</slot>
</div>
