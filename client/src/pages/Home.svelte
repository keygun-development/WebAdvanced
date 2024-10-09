<script>
    import {onMount} from 'svelte';
    import Select from "../components/Select.svelte"

    let games = [];
    let genres = [];
    const consoles = [
        {id: 1, name: "Playstation 5"},
        {id: 2, name: "Xbox Series X"},
        {id: 3, name: "Nintendo Switch"},
        {id: 4, name: "PC"},
    ]

    let selectedMaxPrice = 500;

    onMount(async () => {
        const responseGames = await fetch("http://localhost:3000/games")
        games = await responseGames.json();

        const responseGenres = await fetch("http://localhost:3000/genres")
        genres = await responseGenres.json();
    });

    const filterByGenre = async (genreName) => {
        const response = await fetch(`http://localhost:3000/games?genreId=${genreName}`)
        games = await response.json();
    }

    export let params;
</script>
<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 w-full py-12">
    <h1 class="text-3xl font-bold text-primary">
        Games
    </h1>
    <div class="flex gap-4 w-full mt-4">
        <div class="w-3/12">
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
                    <span id="minPrice" class="text-sm">$0</span>
                    <input type="range" min="0" max="1000" class="range-input" bind:value={selectedMaxPrice} id="priceRange">
                    <span id="maxPrice" class="text-sm">$1000</span>
                </div>
                <p class="w-full text-center">
                    ${selectedMaxPrice}
                </p>
            </div>
        </div>
        <div class="w-9/12">
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
    </div>
</div>
