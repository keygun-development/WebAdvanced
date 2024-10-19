<script>
    import {onMount} from 'svelte';
    import AuctionItem from "../components/AuctionItem.svelte";

    let currentUserId = 1;
    let wonBids = [];
    let activeBids = [];

    onMount(async () => {
        const response = await fetch("http://localhost:3000/games");
        const games = await response.json();

        const now = new Date();

        activeBids = games.filter(game =>
            new Date(game.auction.endDate) > now &&
            game.auction.bidders.some(bidder => bidder.userId === currentUserId)
        );

        wonBids = games.filter(game => {
            const highestBid = game.auction.bidders.reduce((max, bidder) =>
                bidder.amount > max.amount ? bidder : max, { amount: 0 });

            return new Date(game.auction.endDate) <= now && highestBid.userId === currentUserId;
        });
    });

</script>

<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 w-full py-12 px-4">
    <h1 class="text-primary text-4xl">
        Mijn Biedingen
    </h1>
    <h2 class="text-2xl mt-8 text-white">
        Actieve Biedingen
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {#each activeBids as game}
            <AuctionItem overbid={game?.overbid ?? false} item={game}/>
        {/each}
    </div>

    <h2 class="text-2xl mt-8 text-white">
        Gewonnen Biedingen
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {#each wonBids as game}
            <AuctionItem item={game}/>
        {/each}
    </div>
    <p class="text-white text-right">
        Nog te betalen door u:
        €{wonBids.reduce((total, game) => total + game.auction.bidders.find(bidder => bidder.userId === currentUserId).amount, 0)}
    </p>
</div>