<script>
	/*
		I promise I'll clean this up in future.
	*/
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
	let bordersEnabled = false;
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

	const downloadImages = () => {
		const images = document.querySelectorAll('.img-trimmed');
		images.forEach(async (img, index) => {
			const src = img.src;

			// Fetch the image as a blob.
			const fetchResponse = await fetch(src);
			const blob = await fetchResponse.blob();

			// Figure out a name for it from the src and the mime-type.
			const name = files[index].name;

			// Download the blob using a <a> element.
			const a = document.createElement('a');
			a.setAttribute('href', URL.createObjectURL(blob));
			a.setAttribute('download', name);
			a.click();
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
				Remove any transparent or colored whitespace surrounding images. Processes images right in
				your browser. Supports PNGs & JPGs. No size limits. Absolutely free to use, forever.
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
		<div class="mb-4">
			<Button color="alternative"
				><Chevron>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 96 960 960"
						class="mr-3 w-5 h-5"
						stroke="currentColor"
					>
						<path
							d="M414 758q-14 0-28.146-6-14.147-6-25.854-17L182 557q-11-11.895-17-26.268-6-14.372-6-30.232t6-30.728q6-14.868 17-25.772l189-189-95-95q-8-8.5-8-21.25t9-22.141Q286 108 298.5 108t21.5 9l326 327q12 10.904 17.5 25.772Q669 484.64 669 500.5q0 15.86-5.5 30.232Q658 545.105 646 557L468 735q-10.732 11-25.366 17T414 758Zm0-460L215 497h398L414 298Zm337.788 477Q722 775 701 753.85 680 732.7 680 703q0-17.348 8-37.174T710 625q8-13 19.5-28t22.5-28q11 13 22.5 28t19.5 28q14 21 22 40.826T824 703q0 29.7-21.212 50.85-21.213 21.15-51 21.15ZM141 1057q-25.162 0-43.081-17.89Q80 1021.23 80 996.115T97.919 953.5Q115.838 936 141 936h679q24.75 0 42.375 17.677t17.625 42.5Q880 1021 862.375 1039T820 1057H141Z"
						/>
					</svg>
					{colorOptions[colorRadio].name}
				</Chevron></Button
			>
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
		</div>
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
					<Checkbox
						on:click={() => {
							bordersEnabled = !bordersEnabled;
						}}
					>
						Preview Borders
					</Checkbox>
				</div>
			</div>

			<div class="grid grid-cols-8 gap-8 mb-8">
				{#each files as file}
					<div>
						<div class="flex items-center justify-center aspect-square mb-4">
							{#if file.dataURL}
								<img
									class="object-scale-down max-h-full border img-trimmed"
									class:border-transparent={!bordersEnabled}
									class:border-gray-300={bordersEnabled}
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
			<Button pill={true} size="xl" on:click={downloadImages}>Download Images</Button>
		{:else}
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
							<div
								class:self-center={isTrimmed}
								class:self-start={!isTrimmed}
								class:border={!isTrimmed}
							>
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
		{/if}
	</div>
</div>
