<script>
    import {onMount} from 'svelte';
    import Select from "../components/Select.svelte"
    import BidItem from "../components/BidItem.svelte";

    let games = [];
    let filteredGames = [];
    let genres = [];
    const consoles = [
        {id: 1, name: "Playstation 5"},
        {id: 2, name: "Xbox Series X"},
        {id: 3, name: "Nintendo Switch"},
        {id: 4, name: "PC"},
    ]

    let selectedMaxPrice = 100;
    let search = "";

    onMount(async () => {
        const responseGames = await fetch("http://localhost:3000/games")
        games = await responseGames.json();
        filteredGames = games;

        const responseGenres = await fetch("http://localhost:3000/genres")
        genres = await responseGenres.json();
    });

    const filterByGenre = async (genreName) => {
        const response = await fetch(`http://localhost:3000/games?genreId=${genreName}`)
        games = await response.json();
    }

    $: filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(search.toLowerCase())
    );

    export let params;
</script>
<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 w-full py-12 px-4">
    <div class="flex items-center justify-between">
        <h1 class="text-4xl text-primary">
            Games
        </h1>
        <input bind:value={search} placeholder="Zoek naar een game..." class="p-2 rounded"/>
    </div>
    <div class="flex lg:flex-row flex-col gap-4 w-full mt-4">
        <div class="lg:w-3/12">
            <div class="bg-white rounded-md p-4 shadow-inset border-2 border-background space-y-4">
                <p class="text-xl text-background">
                    Filters
                </p>
                <Select
                        on:change={(e) => {
                            filterByGenre(e.detail.value)
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
                <Select
                        disabledOption={
                        {value: "", label: "Filter op console", selected: true}
                        }
                        options={
                            consoles.map(console => {
                                return {
                                    value: console.id,
                                    label: console.name
                                }
                            })
                        }
                />
                <p class="text-background text-xl">
                    Maximale Prijs:
                </p>
                <div class="flex justify-between items-center">
                    <span id="minPrice" class="text-sm">€0</span>
                    <input type="range" min="0" max="200" class="range-input" bind:value={selectedMaxPrice}
                           id="priceRange">
                    <span id="maxPrice" class="text-sm">€200</span>
                </div>
                <p class="w-full text-center">
                    €{selectedMaxPrice}
                </p>
            </div>
        </div>
        <div class="lg:w-9/12 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {#each filteredGames as game}
                <BidItem item={game}/>
            {/each}
        </div>
    </div>
</div>
