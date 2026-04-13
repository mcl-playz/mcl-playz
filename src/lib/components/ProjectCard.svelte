<script lang="ts">
	import { goto } from "$app/navigation";

	interface ProjectData {
        name: string;
		desc: string;
		imgSrc?: string;
		repoURL?: string;
    }
	
	let {
		name,
		desc,
		imgSrc = "/squares-base.svg",
		repoURL
	}: ProjectData = $props();
</script>

<div class="min-w-xs">
	<div
		class="glass flex flex-col overflow-hidden rounded-2xl p-4"
	>
		<!-- Image -->
		<div
			class="mb-3 w-full aspect-video shrink-0 rounded-lg overflow-hidden"
			style="background: linear-gradient(135deg, rgb(59, 130, 246, 0.4) 0%, rgb(168, 85, 247, 0.4) 100%);"
		>	
			<img src={imgSrc} alt="Project" class="w-full h-full object-cover">
		</div>

		<!-- Content -->
		<div class="flex flex-1 flex-col">
			<div class="flex items-center justify-between mb-2">
				<h3 class="text-lg font-bold text-white">{name}</h3>
				{#if repoURL}
					<a href={repoURL} target="_blank" rel="noopener noreferrer" class="button">
						View Repository
					</a>
				{/if}
			</div>
			<p class="line-clamp-3 text-sm text-gray-400">
				{desc}
			</p>
		</div>
	</div>
</div>
