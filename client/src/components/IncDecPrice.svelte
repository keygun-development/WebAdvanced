<script>
    export let item;
    let price = item?.auction.currentPrice ?? 0;
    let error = null;
    let success = null;

    const placeBid = async () => {
        error = null;
        success = null;
        if (isNaN(price) || price <= item.auction.currentPrice) {
            error = "De prijs moet een nummer zijn en hoger dan de huidige prijs.";
            return;
        }
        const response = await fetch(`http://localhost:3000/games/${item.id}/bid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({price}),
        });

        if (response.ok) {
            success = "Bod geplaatst!";
            return;
        }

        throw new Error('Failed to place bid');
    };
</script>

<div class="flex flex-col justify-end gap-2 mt-4">
    {#if error}
        <div class="bg-red-500 text-white p-2 rounded">
            {error}
        </div>
    {/if}
    {#if success}
        <div class="bg-green-500 text-white p-2 rounded">
            {success}
        </div>
    {/if}
    <div class="flex items-center justify-between">
        <button
                class="bg-red-500 hover:bg-red-500/80 duration-300 p-2 text-white rounded">
            -€1
        </button>
        <input type="number" class="max-w-20 p-2 rounded" bind:value={price}/>
        <button class="bg-green-500 hover:bg-green-500/80 duration-300 p-2 text-white rounded">
            +€1
        </button>
    </div>
    <button on:click={placeBid} class="p-2 bg-blue-400 text-white hover:bg-blue-500 duration-300">
        Plaats bieding
    </button>
</div>