<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { workspaceStore } from '$lib/stores/workspace-store';
	import { Keypair, SystemProgram, Transaction, type TransactionSignature, LAMPORTS_PER_SOL } from '@solana/web3.js';
	import { toastStore } from '@skeletonlabs/skeleton';

	$: ({ publicKey, sendTransaction } = $walletStore);

	async function handleSendTransaction() {
		if (!publicKey) {
			toastStore.trigger({
				message: 'Wallet not connected!',
				autohide: true,
				timeout: 3000,
				classes: 'bg-warning-500 text-on-warning-token'
			});

			console.log('error', `Send Transaction: Wallet not connected!`);
			return;
		}

		let signature: TransactionSignature = '';

		const { connection } = $workspaceStore;

		try {
			const tx = new Transaction().add(
				SystemProgram.transfer({
					fromPubkey: publicKey,
					toPubkey: Keypair.generate().publicKey,
					lamports: LAMPORTS_PER_SOL / 2 // Send .5 SOL
				})
			);

			signature = await sendTransaction(tx, connection);

			const latestBlockhash = await connection.getLatestBlockhash();
			const confirmedTx = await connection.confirmTransaction({
				blockhash: latestBlockhash.blockhash,
				lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
				signature: signature
			});
			console.log('confirmedTx: ', confirmedTx);

			toastStore.trigger({
				message: 'Transaction successful!',
				autohide: true,
				timeout: 3000,
				action: {
					label: `${signature.slice(0, 8)}...`,
					response: () =>
						open(`https://explorer.solana.com/tx/${signature}?cluster=devnet`, '_blank')
				}
			});
		} catch (error: any) {
			toastStore.trigger({
				message: 'Transaction failed!',
				autohide: true,
				timeout: 3000,
				classes: 'bg-warning-500 text-on-warning-token'
			});

			console.log('error', `Transaction failed! ${error?.message}`, signature);
			return;
		}
	}
</script>

<button class="btn variant-filled-primary btn-lg" disabled={!publicKey} on:click={handleSendTransaction}
	>Send Transaction</button
>
