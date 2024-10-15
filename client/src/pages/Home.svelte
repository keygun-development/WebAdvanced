<script>
    import {onMount} from 'svelte';
    import Select from "../components/Select.svelte"
    import AuctionItem from "../components/AuctionItem.svelte";
    import Toast from "../components/Toast.svelte";

    let games = [];
    let filteredGames = [];
    let genres = [];
    let producers = [];
    let filters = [];
    let consoles = [];
    let selectedMaxPrice = 100;
    let search = "";

    onMount(async () => {
        const responseGames = await fetch("http://localhost:3000/games")
        games = await responseGames.json();
        filteredGames = games;
        games.forEach(game => {
            game.consoles.forEach(console => {
                if (!consoles.some(c => c === console)) {
                    consoles = [...consoles, console];
                }
            });
        });
    });

    const addFilter = async (filter, value) => {
        if (filters.some(f => f.filter === filter)) {
            filters = filters.filter(f => f.filter !== filter);
        }
        if (value !== "") {
            filters = [...filters, {filter, value}];
        }
        const response = await fetch("http://localhost:3000/games?" + filters.map(f => `${f.filter}=${f.value}`).join("&"));
        filteredGames = await response.json();
    }

    $: genres = Array.from(new Set(games.map(game => game.genre).filter(Boolean)));
    $: producers = Array.from(new Set(games.map(game => game.producer).filter(Boolean)));
    $: filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(search.toLowerCase())
    );

    export let params;
</script>
<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 w-full py-12 px-4">
    <div class="flex items-center justify-between flex-wrap">
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
                            addFilter('genre', e.detail.value)
                        }}
                        disabledOption={
                        {value: "", label: "Filter op genre", selected: true}
                        }
                        options={
                            genres.map(genre => {
                                return {
                                    value: genre,
                                    label: genre
                                }
                            })
                        }
                />
                <Select
                        on:change={(e) => {
                            addFilter('console', e.detail.value)
                        }}
                        disabledOption={
                        {value: "", label: "Filter op console", selected: true}
                        }
                        options={
                            consoles.map(console => {
                                return {
                                    value: console,
                                    label: console
                                }
                            })
                        }
                />
                <Select
                        on:change={(e) => {
                            addFilter('producer', e.detail.value)
                        }}
                        disabledOption={
                        {value: "", label: "Filter op uitgever", selected: true}
                        }
                        options={
                            producers.map(producer => {
                                return {
                                    value: producer,
                                    label: producer
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
            {#if filteredGames.length > 0}
                {#each filteredGames as game}
                    <AuctionItem item={game}/>
                {/each}
            {:else}
                <Toast variant="error">
                    Geen games gevonden
                </Toast>
            {/if}
        </div>
    </div>
</div>
