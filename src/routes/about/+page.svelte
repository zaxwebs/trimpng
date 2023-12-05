<script>
	import { Heading, P, Button, A, Video } from 'flowbite-svelte';
</script>

<div class="px-2 sm:px-4 py-2.5 w-full">
	<div class="mx-auto max-w-2xl format-p:text-gray-500 format-p:mb-4 format-h3:mb-4">
		<div class="mb-8">
			<Heading tag="h3">About TrimPNG</Heading>
			<P>
				Imagine this. You find that perfect PNG to add to your design but like many others it has
				padding around it. Wouldn't it be great if there was a web app that instantly removes that
				extra space? That's exactly where TrimPNG comes in.
			</P>
			<div class="flex mb-4">
				<Video src="videos/demo.mp4" controls trackSrc="flowbite.mp4" />
			</div>

			<P>
				TrimPNG is a browser-based app to remove transparent, white, black or any other colored
				whitespace from around images. It has smart boundary & color detection plus auto-cropping.
				All processing happens in the browser. And to top it off, TrimPNG is free to use, there's no
				subscriptions or limits.
			</P>
		</div>
		<div class="mb-8">
			<Heading tag="h3">Who is this for?</Heading>
			<P>
				TrimPNG can be a quick little bookmark for designers & developers. But honestly, there are
				no gates here. If you need to trim an image or two, by all means, you are welcome to do so.
			</P>
		</div>
		<div class="mb-8">
			<Heading tag="h3">Support development</Heading>
			<P>
				If you do want to help, a coffee would be appreciated. If you feel like it, you can <A
					href="https://www.buymeacoffee.com/zaxwebs">send some this way</A
				>.
			</P>
		</div>
		<div>
			<Heading tag="h3">Contact</Heading>
			<P>
				You can reach me here: <A href="https://instagram.com/zaxwebs">instagram.com/zaxwebs</A>.
			</P>
		</div>
	</div>
</div>
