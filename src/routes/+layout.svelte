<script>
	import '../app.postcss';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import {
		Footer,
		FooterBrand,
		FooterCopyright,
		FooterIcon,
		FooterLink,
		FooterLinkGroup
	} from 'flowbite-svelte';
</script>

<body class="min-h-screen flex flex-col">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<img
				src="https://flowbite.com/docs/images/logo.svg"
				class="mr-3 h-6 sm:h-9"
				alt="Flowbite Logo"
			/>
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				TrimPNG
			</span>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			<NavLi href="/" active={$page.url.pathname === '/'}>Home</NavLi>
			<NavLi href="/about" active={$page.url.pathname === '/about'}>About</NavLi>
			<NavLi href="https://www.buymeacoffee.com/zaxwebs">Donate</NavLi>
		</NavUl>
	</Navbar>
	<main class="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-100 flex-1">
		<slot />
	</main>
	<Footer>
		<FooterCopyright href="/" by="TrimPNG" />
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
		>
			<FooterLink href="/">About</FooterLink>
			<FooterLink href="/">Privacy Policy</FooterLink>
			<FooterLink href="/">Contact</FooterLink>
		</FooterLinkGroup>
	</Footer>
</body>
