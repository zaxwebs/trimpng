<script>
	import '../app.postcss';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import {
		Footer,
		FooterBrand,
		FooterCopyright,
		FooterIcon,
		FooterLink,
		FooterLinkGroup
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>TrimPNG</title>
</svelte:head>
<body class="min-h-screen flex flex-col">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				TrimPNG
			</span>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			<NavLi href="/" active={$page.url.pathname === '/'}>Home</NavLi>
			<NavLi href="/about" active={$page.url.pathname === '/about'}>About</NavLi>
		</NavUl>
	</Navbar>
	<main class="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-100 flex-1">
		<slot />
	</main>
	<div class="bg-white dark:bg-gray-900 dark:text-gray-200">
		<Footer class="rounded-none">
			<FooterCopyright href="/" by="TrimPNG v0.2.0" />
			<FooterLinkGroup
				ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
			>
				<FooterLink href="/about">About</FooterLink>
			</FooterLinkGroup>
		</Footer>
	</div>
</body>
