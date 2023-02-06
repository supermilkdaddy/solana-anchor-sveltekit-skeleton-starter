<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { getLocalStorage } from '@svelte-on-solana/wallet-adapter-core';
	import AnchorConnectionProvider from '$lib/components/wallet/AnchorConnectionProvider.svelte';
	import { WalletProvider, WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
  import { clusterApiUrl } from '@solana/web3.js';
	import * as anchor from '@project-serum/anchor';
	import { browser } from '$app/environment';

  // ***IMPORTANT: MUST copy IDL .json file to frontend on each anchor build!
	// import idl from '../../../target/idl/solana_anchor_sveltekit_skeleton_starter.json';
  // NOTE For Vercel deploy, I specify Root to be /app, which makes ../target dir unavailable!
  // This results in a RollupError: Could not resolve "../../../target/idl/..."
	import idl from '$lib/idl/solana_anchor_sveltekit_skeleton_starter.json';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { workspaceStore } from '$lib/stores/workspace-store';
  import { balanceStore } from '$lib/stores/balance-store';
	import { Toast } from '@skeletonlabs/skeleton';

	const localStorageKey = 'walletAdapter';
	// const endpoint = WalletAdapterNetwork.Devnet;
	const network = clusterApiUrl("devnet");
	// const network = 'http://localhost:8899';

	let wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

	$: autoConnect = browser && Boolean(getLocalStorage('autoconnect', false));

	const SOLANA_ANCHOR_SVELTEKIT_SKELETON_STARTER_PROGRAM_ID = new anchor.web3.PublicKey(
    '7j6ARQdmgrJwEqgJDHC82nvwQX26qcDF79osU6M7kmui'
	);

	// Create some variables to react to Stores' state
	$: hasWorkspaceProgramReady =
		$workspaceStore &&
		$workspaceStore.program &&
		$workspaceStore.program.programId.toBase58() ===
			SOLANA_ANCHOR_SVELTEKIT_SKELETON_STARTER_PROGRAM_ID.toBase58();

	$: hasWalletReadyForFetch =
		$walletStore.connected && !$walletStore.connecting && !$walletStore.disconnecting;

	$: if (hasWalletReadyForFetch && hasWorkspaceProgramReady) {
		console.log('Wallet and Workspace ready!');

		// Get the user's SOL balance using balanceStore
		balanceStore.getUserSOLBalance(
			$walletStore.publicKey as anchor.web3.PublicKey,
			$workspaceStore.connection
		);
	}
</script>

<!-- WalletProvider & ConnectionProvider -->
<WalletProvider {localStorageKey} {wallets} {autoConnect} />
<AnchorConnectionProvider {network} {idl} />

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl uppercase">Solana + Sveltekit</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-ghost-surface" href="/basics">Basics</a>
				<a class="btn btn-sm variant-ghost-surface" href="/pdas">PDAs</a>
				<WalletMultiButton maxNumberOfWallets={5} />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	<Toast />
	<svelte:fragment slot="pageFooter">
		<div class="logo-cloud grid-cols-1 sm:grid-cols-3 gap-1">
			<a class="logo-item" href="https://svelte.dev/" target="_blank" rel="noreferrer">
				<!-- <span><SvgIcon name="svelte" width="w-8" height="h-8" /></span> -->
				<span>Svelte</span>
			</a>
			<a class="logo-item" href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
				<!-- <span><SvgIcon name="tailwind" width="w-6" height="h-6" /></span> -->
				<span>Tailwind</span>
			</a>
			<a class="logo-item" href="https://github.com/" target="_blank" rel="noreferrer">
				<!-- <span><SvgIcon name="github" width="w-6" height="h-6" /></span> -->
				<span>Github</span>
			</a>
		</div>
	</svelte:fragment>
</AppShell>
