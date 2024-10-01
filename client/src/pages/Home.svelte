<script>
    import {onMount} from 'svelte';
    import Select from "../components/Select.svelte"

    let games = [];
    let genres = [];

    onMount(async () => {
        const response = await fetch("http://localhost:3000/games")
        games = await response.json();

        const responseGenres = await fetch("http://localhost:3000/genres")
        genres = await responseGenres.json();
    });
    export let params;
</script>
<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 w-full py-12">
    <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">
            Games
        </h1>
        <Select
                on:change={(e) => {
                    console.log(e.detail)
                }}
                disabledOption={
                {value: "", label: "Filter op genre", selected: true}
            }
                options={
                genres.map(genre => {
                    return {
                        value: genre.id,
                        label: genre.name
                    }
                })
            }
        />
    </div>
    {#each games as game}
        <div class="flex justify-between items-center border-b border-gray-300 py-2">
            <div>
                <h2 class="text-xl font-bold">{game.name}</h2>
                <p>{game.description}</p>
            </div>
            <div>
                <a href="/games/{game.slug}" class="text-primary-500">View</a>
            </div>
        </div>
    {/each}
</div>
