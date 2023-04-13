<script>
	import { P, Toggle } from 'flowbite-svelte';
	let comparisonLogos = ['google', 'samsung', 'adobe', 'disney', 'facebook', 'netflix'];
	let isTrimmed = true;
</script>

<div class="mx-auto max-w-4xl">
	<div class="flex flex-col items-center">
		<Toggle
			on:change={() => {
				isTrimmed = !isTrimmed;
			}}
			class="mb-4"
			checked={isTrimmed}>TrimPNG</Toggle
		>
		<P class="mb-8 text-slate-500">
			{#if isTrimmed}
				No whitespace around images.
			{:else}
				Whitespace around images.
			{/if}
		</P>
		<div class="grid grid-cols-2 md:grid-cols-6 gap-12">
			{#each comparisonLogos as logo}
				<div class:self-center={isTrimmed} class:self-start={!isTrimmed} class:border={!isTrimmed}>
					<img
						class="w-full"
						src="images/comparison-logos/{logo}{isTrimmed ? '-trimmed' : ''}.png"
						alt="logo"
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
