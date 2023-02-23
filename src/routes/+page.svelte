<script>
	import {
		Heading,
		P,
		Button,
		A,
		Checkbox,
		Dropdown,
		Chevron,
		Radio,
		Toggle
	} from 'flowbite-svelte';
	import { Dropzone } from 'flowbite-svelte';
	import { Spinner } from 'flowbite-svelte';
	import { colorOptions } from '$utils/color-options.js';

	import {
		getImageData,
		getCroppedImageData,
		getCroppedDataUrl,
		getBoundaryColor
	} from '$utils/image-processing.js';

	let colorRadio = 'transparentOrWhite';
	let files = [];
	let processedFilesCount = 0;
	let guidelinesEnabled = false;
	let comparisonLogos = ['google', 'samsung', 'adobe', 'disney', 'facebook', 'netflix'];
	let isTrimmed = true;

	const handleFileInput = async (newFiles) => {
		const length = files.length;
		files = [...files, ...newFiles];

		[...newFiles].map(async (file, index) => {
			const imageData = await getImageData(file);
			const boundaryColor = getBoundaryColor(imageData, colorRadio);
			const croppedImageData = getCroppedImageData(imageData, boundaryColor);
			const croppedDataUrl = getCroppedDataUrl(croppedImageData);
			file.dataURL = croppedDataUrl;
			files[length + index] = file;
			files = [...files];
			processedFilesCount += 1;
		});
	};
</script>

<div class="px-2 sm:px-4 py-8 w-full">
	<div class="mx-auto container">
		<div class="text-center">
			<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
				Instantly Trim Image Whitespace
			</Heading>
			<P class="text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
				Remove transparent, white, black or any colored space around images. Processes images right
				in your browser. Supports PNGs & JPGs. No size limits. Absolutely free to use, forever.
				<A class="font-medium hover:underline" href="/about">
					Learn more
					<svg
						aria-hidden="true"
						class="ml-1 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</A>
			</P>
		</div>
	</div>
</div>

<div class="px-2 sm:px-4 py-2.5 w-full">
	<div class="mx-auto container">
		<div
			on:drop|preventDefault={(e) => handleFileInput(e.dataTransfer.files)}
			on:dragover|preventDefault={(e) => {}}
		>
			<Dropzone
				class="mb-4"
				multiple
				id="dropzone"
				on:change={(e) => {
					handleFileInput(e.target.files);
					e.target.value = '';
				}}
				accept=".png, .jpg, .jpeg"
			>
				<svg
					aria-hidden="true"
					class="mb-3 w-10 h-10 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
					/></svg
				>
				<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span class="font-semibold">Click to upload</span> or drag and drop
				</p>
				<p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WebP</p>
			</Dropzone>
		</div>

		{#if files.length}
			<div class="flex justify-between mb-4">
				<h3 class="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
					Preview
					<span
						class="font-medium inline-flex items-center justify-center px-2.5 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded text-2xl font-semibold ml-2"
					>
						{processedFilesCount}/{files.length}
					</span>
				</h3>
				<div class="flex gap-4">
					<Button color="alternative"><Chevron>{colorOptions[colorRadio].name}</Chevron></Button>
					<Dropdown class="w-60 p-3 space-y-1">
						{#each Object.keys(colorOptions) as colorKey}
							<li>
								<Radio
									class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
									bind:group={colorRadio}
									value={colorKey}>{colorOptions[colorKey].name}</Radio
								>
							</li>
						{/each}
					</Dropdown>
					<Checkbox
						on:click={() => {
							guidelinesEnabled = !guidelinesEnabled;
						}}
					>
						Guidelines
					</Checkbox>
				</div>
			</div>

			<div class="grid grid-cols-8 gap-8 mb-8">
				{#each files as file}
					<div>
						<div class="flex items-center justify-center aspect-square mb-4">
							{#if file.dataURL}
								<img
									class="object-scale-down max-h-full border"
									class:border-transparent={!guidelinesEnabled}
									class:border-gray-300={guidelinesEnabled}
									src={file.dataURL}
									alt={file.name}
								/>
							{:else}
								<Spinner />
							{/if}
						</div>
						<div class="truncate">{file.name}</div>
					</div>
				{/each}
			</div>
			<Button pill={true} size="xl">Download Images</Button>
		{:else}
			<div class="flex flex-col items-center">
				<Toggle
					on:change={() => {
						isTrimmed = !isTrimmed;
					}}
					class="mb-4"
					checked={isTrimmed}>TrimPNG</Toggle
				>
				{#if isTrimmed}
					<P class="mb-8">No whitespace around images.</P>
				{:else}
					<P class="mb-8">Uneven whitespace around images.</P>
				{/if}
				<div class="inline-flex justify-between gap-12">
					{#each comparisonLogos as logo}
						<img
							class={isTrimmed ? 'self-center' : 'self-start border'}
							src="images/comparison-logos/{logo}{isTrimmed ? '-trimmed' : ''}.png"
							alt="logo"
						/>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
