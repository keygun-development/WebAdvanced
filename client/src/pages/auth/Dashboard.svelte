<script>
    import {onMount} from "svelte";
    import AuctionItem from "../../components/AuctionItem.svelte";

    let expiredAuctions = [];
    let activeAuctions = [];

    onMount(async () => {
        const response = await fetch('http://localhost:3000/games');
        const data = await response.json();

        activeAuctions = data.filter(game => game.auction.endDate > new Date().toISOString());
        expiredAuctions = data.filter(game => game.auction.endDate < new Date().toISOString());
    })
</script>
<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 w-full py-12 px-4">
    <div class="flex items-center justify-between">
        <h1 class="text-primary text-4xl">
            Dashboard
        </h1>
        <a href="/dashboard/auctions/new" class="bg-secondary p-4 text-white py-2 rounded hover:bg-secondary/90 duration-300 transition-all">
            Nieuwe veiling
        </a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div class="bg-background/90 p-4 rounded">
            <p class="text-xl text-white">
                Actieve biedingen
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 mt-4">
                {#each activeAuctions as game}
                    <AuctionItem item={game}/>
                {/each}
            </div>
        </div>
        <div class="bg-background/90 p-4 rounded">
            <p class="text-xl text-white">
                Verlopen biedingen
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                {#each expiredAuctions as game}
                    <AuctionItem item={game}/>
                {/each}
            </div>
        </div>
    </div>
</div>