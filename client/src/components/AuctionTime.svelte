<script>
    import {onMount} from "svelte";

    let remainingTime = "";

    onMount(() => {
        updateRemainingTime(endDate);

        const intervalId = setInterval(() => {
            const now = new Date();
            if (now >= endDate) {
                clearInterval(intervalId);
                remainingTime = "Bieding is afgelopen";
            } else {
                updateRemainingTime(endDate);
            }
        }, 1000);
    })

    function updateRemainingTime(endDate) {
        const now = new Date();
        const timeLeft = endDate.getTime() - now.getTime();

        if (timeLeft > 0) {
            const seconds = Math.floor((timeLeft / 1000) % 60);
            const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
            const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

            remainingTime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            remainingTime = "Bieding is afgelopen";
        }
    }

    export let endDate;
</script>
<p class="text-secondary">
    {#if remainingTime === "Bieding is afgelopen"}
        <span class="text-red-500">
            {remainingTime}
        </span>
    {:else}
        <span class="text-green-500">
            {remainingTime}
        </span>
    {/if}
</p>