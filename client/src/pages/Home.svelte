<script>
    import {onMount} from 'svelte';

    let games = [];

    onMount(async () => {
        const response = await fetch("http://localhost:3000/games")
        games = await response.json();
    });
    export let params;
</script>

<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0">
    <h1 class="text-3xl font-bold">
        Games
    </h1>
    {#each games as game}
        <div class="flex justify-between items-center border-b border-gray-300 py-2">
            <div>
                <h2 class="text-xl font-bold">{game.name}</h2>
                <p>{game.description}</p>
            </div>
            <div>
                <a href="/games/{game.id}" class="text-primary-500">View</a>
            </div>
        </div>
    {/each}
</div>
