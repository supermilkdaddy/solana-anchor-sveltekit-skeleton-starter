<script lang="ts">
	import SignMessage from '$lib/components/wallet/SignMessage.svelte';
	import SendTransaction from '$lib/components/wallet/SendTransaction.svelte';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center">
    <h1 class="gradient-heading">Basics</h1>
		<div class="flex flex-col space-y-4">
			<SignMessage />
			<SendTransaction />
		</div>
	</div>
</div>
