<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { toastStore } from '@skeletonlabs/skeleton';
	import * as anchor from '@project-serum/anchor';
	import { sign } from 'tweetnacl';

	$: ({ publicKey, signMessage } = $walletStore);

	async function handleSignMessage() {
		try {
			// `publicKey` will be null if the wallet isn't connected
			if (!publicKey) throw new Error('Wallet not connected!');
			// `signMessage` will be undefined if the wallet doesn't support it
			if (!signMessage) throw new Error('Wallet does not support message signing!');
			// Encode anything as bytes
			const message = new TextEncoder().encode('Hello, world!');
			// Sign the bytes using the wallet
			const signature = await signMessage(message);
			// Verify that the bytes were signed using the private key that matches the known public key
			if (!sign.detached.verify(message, signature, publicKey.toBytes()))
				throw new Error('Invalid signature!');

			toastStore.trigger({
        preset: "success",
				message: `Sign message successful! ${anchor.utils.bytes.bs58.encode(signature.slice(0, 8))}...`,
				autohide: true,
				timeout: 3000,
			});

		} catch (error: any) {
			toastStore.trigger({
        preset: "error",
				message: `Sign message failed! ${error?.message}`,
				autohide: true,
				timeout: 3000
			});

		}
	}
</script>

<button class="btn variant-filled-primary btn-lg" disabled={!publicKey} on:click={handleSignMessage}
	>Sign Message</button
>
