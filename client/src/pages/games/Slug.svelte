<script>
    import {onMount} from "svelte"
    import isAuthenticated from "../../stores/auth.js";
    import IncDecPrice from "../../components/IncDecPrice.svelte";
    import AuctionTime from "../../components/AuctionTime.svelte";

    let currentGame = {};
    let endDate = new Date();

    onMount(async () => {
        const response = await fetch("http://localhost:3000/games/" + params.params.slug)
        currentGame = await response.json()

        endDate = new Date(currentGame.auction.endDate);
    })

    export let params;
</script>

<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 w-full py-12 px-4">
    {#if Object.keys(currentGame).length > 0}
        <h1 class="text-4xl text-primary">
            {currentGame.name}
        </h1>
        <div class="grid md:grid-cols-3 flex-col md:flex-row mt-4 gap-4">
            <div class="relative w-full flex-1">
                <img src={currentGame.image} alt={currentGame.name}
                     class="relative inset-0 object-cover w-full h-full bg-black/50 duration-300 transition-all"/>
            </div>
            <div class="flex flex-col justify-between">
                <div>
                    <AuctionTime endDate={new Date(currentGame.auction.endDate)}/>
                    <p class="text-lg text-white mt-2">
                        {currentGame.description}
                    </p>
                </div>
                {#if $isAuthenticated}
                    <IncDecPrice item={currentGame}/>
                    {:else}
                    <p class="text-white">
                        U moet <a href="/inloggen" class="underline-offset-4 underline text-primary">inloggen</a> om te bieden.
                    </p>
                {/if}
            </div>
            <div class="flex flex-col h-full max-h-[400px] divide-y overflow-auto bg-background/10">
                {#each currentGame.auction.bidders.sort((a, b) => b.amount - a.amount) as bidder}
                    <div class="flex justify-between items-center p-4 animate-fly-in duration-100">
                        <p class="text-white">
                            {bidder.name}
                        </p>
                        <p class="text-white">
                            €{bidder.amount}
                        </p>
                    </div>
                {/each}
            </div>
        </div>

    {/if}
</div>