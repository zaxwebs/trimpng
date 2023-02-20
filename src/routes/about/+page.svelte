<script>
	import { Heading, P, Button, A } from 'flowbite-svelte';
</script>

<div class="px-2 sm:px-4 py-2.5 w-full">
	<div class="mx-auto max-w-2xl format-p:text-gray-500 format-p:mb-4 format-h3:mb-4">
		<div class="mb-8">
			<Heading tag="h3">About TrimPNG</Heading>
			<P>
				Imagine this. You find that perfect PNG to add to your design but like many others it has
				this extra empty space around it. Sigh, you'll have to open up that image editor and crop
				manually. But wait, wouldn't it be great if there was a web app that does that for you and
				instantly? That's exactly where TrimPNG comes in.
			</P>
			<P>
				TrimPNG is a browser-based app to remove transparent, white, black or any other colored
				whitespace from around images. It has smart boundary & color detection plus auto-cropping.
				And the best part is that all processing happens in the browser. And to top it off, TrimPNG
				is free to use, there's no subscriptions or limits.
			</P>
		</div>
		<div class="mb-8">
			<Heading tag="h3">The story behind TrimPNG</Heading>
			<P>
				I was once working on a project where I had to remove whitespace from 400 images, back then
				I wrote a little Python script to help me with the task. I quickly did a search for a web
				app and most of them were super slow or had limits, so I took it upon myself to build a
				whitespace trimmer with in-browser processing.
			</P>
			<P>
				I mostly work on stuff like this on the weekends or when I can't find anything to watch in
				my free time.
			</P>
		</div>
		<div class="mb-8">
			<Heading tag="h3">Who is this for?</Heading>
			<P>
				TrimPNG can be a quick little bookmark for designers & developers. But honestly, there are
				no gates here. If you need to trim an image or two, by all means, you are welcome to do so.
			</P>
		</div>
		<div>
			<Heading tag="h3">Support development</Heading>
			<P>
				You might be wondering why and how is this free? Well, luckily, TrimPNG does not have high
				server costs as it does all the magic in your browser. I do drink some coffee when when
				working on projects. If you feel like it, you can <A
					href="https://www.buymeacoffee.com/zaxwebs">send some this way</A
				>.
			</P>
		</div>
	</div>
</div>
