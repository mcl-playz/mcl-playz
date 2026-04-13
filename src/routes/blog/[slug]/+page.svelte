<script lang="ts">
    let { data } = $props();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        
        return new Intl.DateTimeFormat('en-US', {
            month: 'short', // "Jul"
            day: 'numeric', // "22"
            year: 'numeric' // "2025"
        }).format(date);
    };
</script>

<article class="w-4xl h-full flex flex-col relative mx-auto pb-8">
    <div class="mb-4">
        <h1 class="text-5xl mb-3">{data.meta.title}</h1>
        <div class="border-y border-white/10 p-2">
            <p>{data.stats.readingTime} min read • {formatDate(data.meta.date)}</p>        
        </div>
    </div>
    <div class="blog-body">
        {@html data.content}
    </div>
</article>

<style lang="postcss">
    @reference "tailwindcss";
    .blog-body :global(a) {
        @apply underline text-neutral-200 hover:text-white;
    }
</style>