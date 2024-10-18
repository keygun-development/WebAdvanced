<script>
    import Toast from "./Toast.svelte";
    import Button from "./Button.svelte";

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
        <Toast variant="error">
            {error}
        </Toast>
    {/if}
    {#if success}
        <Toast variant="success">
            {success}
        </Toast>
    {/if}
    <div class="flex items-center justify-between">
        <Button
                on:click={() => price = Math.max(price - 1, item.auction.currentPrice)}
                variant="error">
            -€1
        </Button>
        <input type="number" class="max-w-20 p-2 rounded" bind:value={price}/>
        <Button
                on:click={() => price = Math.max(price + 1, item.auction.currentPrice)}
                variant="success">
            +€1
        </Button>
    </div>
    <Button variant="secondary" on:click={placeBid}>
        Plaats bieding
    </Button>
</div>