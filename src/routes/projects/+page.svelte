<script lang="ts">
	import ProjectCard from "$lib/components/ProjectCard.svelte";
	import SkeletonCard from "$lib/components/SkeletonCard.svelte";
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    interface ProjectData {
        name: string;
		desc: string;
		imgSrc?: string;
		repoURL?: string;
    }

    let projects: ProjectData[] | null = null;
    let error: boolean = false;

    onMount(async () => {
        try {
            const res = await fetch('/projects.json');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            projects = await res.json();
        } catch (e) {
            error = true;
        }
    });

	function getColsClass(count: number): string {
		const cols = Math.min(count, 4);
		const colMap: { [key: number]: string } = {
			1: 'grid-cols-1',
			2: 'grid-cols-2',
			3: 'grid-cols-3',
			4: 'grid-cols-4'
		};
		return colMap[cols] || 'grid-cols-4';
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-start">
    {#if error}
        <p>An error occured whilst loading project data...</p>
    {:else if !projects}
        <div
            class="grid grid-cols-4 gap-4 absolute"
            out:fly={{y: 20, duration: 500, delay: 250}}
        >
            {#each Array(8) as _}
                <SkeletonCard />
            {/each}
        </div>
    {:else}
        <div 
            class="grid {getColsClass(projects.length)} gap-4"
            in:fly={{y: 20, duration: 500, delay: 750}}
        >
            {#each projects as project}
                <ProjectCard name={project.name} desc={project.desc} imgSrc={project.imgSrc} repoURL={project.repoURL} />
            {/each}
        </div>
    {/if}
</div>