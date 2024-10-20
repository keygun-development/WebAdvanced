<script>
    import AuctionTime from "./AuctionTime.svelte";

    export let item;
</script>

<div class="relative flex flex-col">
    <a href="/games/{item.slug}" class="relative group flex-1">
        <img class="relative inset-0 object-cover w-full h-full bg-black/50 duration-300 transition-all group-hover:bg-black/80"
             src={item.image === "" ? "/assets/games/placeholder.png" : item.image}
             alt={item.name + " afbeelding"}/>

        <div class="absolute bottom-0 right-0 left-0 flex flex-col justify-end text-white px-4 h-0 overflow-hidden duration-300 transition-all group-hover:h-1/2 from-black bg-gradient-to-t to-transparent group-hover:py-4">
            <h2 class="text-xl font-bold">{item.name}</h2>
            <p>{item.description}</p>
        </div>
        <div>
            <p class="text-white bg-secondary p-2 absolute top-0 right-0 rounded-bl-md">
                €{item.auction.currentPrice}
            </p>
        </div>
    </a>
    <div class="mt-2">
        <AuctionTime endDate={new Date(item.auction.endDate)}/>
    </div>
</div>

