<script>
    export let item;
</script>

<div class="flex flex-col justify-end gap-2 mt-4">
    <div class="flex items-center justify-between">
        <button
                class="bg-red-500 hover:bg-red-500/80 duration-300 p-2 text-white rounded">
            -€1
        </button>
        <input class="max-w-10 p-2 rounded" bind:value={item.auction.currentPrice}/>
        <button class="bg-green-500 hover:bg-green-500/80 duration-300 p-2 text-white rounded">
            +€1
        </button>
    </div>
    <button class="p-2 bg-blue-400 text-white hover:bg-blue-500 duration-300">
        Plaats bieding
    </button>
</div>