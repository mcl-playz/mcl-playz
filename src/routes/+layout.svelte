<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	// import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { page } from '$app/stores';

	let { children } = $props();
	
	function floatIn(node: HTMLElement, { delay = 0, duration = 400, y = 20 }) {
		return {
			delay,
			duration,
			css: (t: number) => {
				const eased = cubicOut(t);
				return `
					transform: translateY(${(1 - eased) * y}px);
					opacity: ${eased};
				`;
			}
		};
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
  <header class="relative flex items-center justify-between w-full max-w-5xl h-15 px-3
    glass">
    
    <div class="flex items-center gap-3 pl-2">
      <img src="/squares-nobg.svg" width="24rem" alt="Logo" class="shrink-0">
      <span class="text-[14px] font-semibold text-[#f5f5f7] tracking-tight leading-none">Jasper Green</span>
    </div>

    <nav class="hidden lg:flex items-center gap-1 pr-2">
      <a href="/" class="px-3 py-1 text-[13px] text-gray-400 hover:text-white transition-colors duration-200">Home</a>
      <a href="/projects" class="px-3 py-1 text-[13px] text-gray-400 hover:text-white transition-colors duration-200">Projects</a>
      <a href="/skills" class="px-3 py-1 text-[13px] text-gray-400 hover:text-white transition-colors duration-200">Skills</a>
      <a href="/blog" class="px-3 py-1 text-[13px] text-gray-400 hover:text-white transition-colors duration-200">Blog</a>
    </nav>

    <div class="flex items-center gap-4">
      <button class="flex items-center gap-2">
        Something!
      </button>
    </div>
  </header>
</div>

<main class="min-h-screen bg-[#050505] px-6 pt-24">
    {#key $page.url.pathname}
        <div
            class="w-full text-white"
            in:floatIn={{ y: 20, duration: 500, delay: 250 }}
        >
            {@render children?.()}
        </div>
    {/key}
</main>

<style lang="postcss">
    :global(html) {
        scrollbar-gutter: stable;
        
        scrollbar-width: 8px;
        scrollbar-color: #222 #050505;
        background-color: #050505;
    }

    :global(::-webkit-scrollbar) {
        width: 8px !important;
    }

    :global(::-webkit-scrollbar-track) {
        background: #050505 !important;
    }

    :global(::-webkit-scrollbar-thumb) {
        background: #222 !important;
        border-radius: 10px !important;
        /* Adds a tiny gap around the thumb for a cleaner look */
        border: 2px solid #050505; 
    }

    :global(::-webkit-scrollbar-thumb:hover) {
        background: #333 !important;
    }

    /* 4. Ensure body doesn't cause horizontal overflow during transitions */
    :global(body) {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }
</style>