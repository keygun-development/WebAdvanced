<script>
    import {onMount} from "svelte"

    let currentGame = {};

    onMount(async () => {
        const response = await fetch("http://localhost:3000/games/" + params.params.slug)
        currentGame = await response.json()
    })

    export let params;
</script>

<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 px-4">
    <div class="flex justify-between items-center border-b border-gray-300 py-2">
        {#if Object.keys(currentGame).length > 0}
            <div>
                <h2 class="text-xl font-bold">{currentGame.name}</h2>
                <p>{currentGame.description}</p>
            </div>
            <div>
                <a href="/games/{currentGame.id}" class="text-primary-500">View</a>
            </div>
        {/if}
    </div>
</div>