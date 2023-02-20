<script>
	import { Heading, P, Button, A, Checkbox } from 'flowbite-svelte';
	import { Dropzone } from 'flowbite-svelte';
	import { Spinner } from 'flowbite-svelte';
	import { Badge } from 'flowbite-svelte';

	import {
		getImageData,
		getCroppedImageData,
		getCroppedDataUrl,
		detectBoundaryColor
	} from '$utils/image-processing.js';

	let files = [];
	let guidelinesEnabled = false;

	$: {
	}

	const handleFileInput = (newFiles) => {
		const length = files.length;
		files = [...files, ...newFiles];

		[...newFiles].forEach((file, index) => {
			getImageData(file).then((imageData) => {
				const boundaryColor = detectBoundaryColor(imageData);
				const croppedImageData = getCroppedImageData(imageData, boundaryColor);
				const croppedDataUrl = getCroppedDataUrl(croppedImageData);
				file.dataURL = croppedDataUrl;
				files[length + index] = file;
				files = [...files];
			});
		});
	};

	const handleDrop = (e) => {
		console.log('Drop');
	};
</script>

<div class="px-2 sm:px-4 py-8 w-full">
	<div class="mx-auto container">
		<div class="text-center">
			<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
				Instantly Trim Image Whitespace
			</Heading>
			<P class="text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
				Remove white, black or transparent space around images. Processes images right in your
				browser. Supports PNGs & JPGs. No size limits. Absolutely free to use, forever.
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
				on:change={(e) => handleFileInput(e.target.files)}
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
			<div class="flex space-between mb-4">
				<Heading class=" flex items-center" tag="h3">
					Preview
					<Badge class="text-2xl font-semibold ml-2">{files.length}</Badge>
				</Heading>
				<Checkbox
					on:click={() => {
						guidelinesEnabled = !guidelinesEnabled;
					}}
				>
					Guidelines
				</Checkbox>
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
		{/if}
	</div>
</div>
