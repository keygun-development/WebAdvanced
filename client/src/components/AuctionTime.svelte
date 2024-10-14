<script>
    import {onMount, onDestroy} from "svelte";

    export let endDate;
    let remainingTime = "";
    let intervalId;

    function updateRemainingTime() {
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

    onMount(() => {
        updateRemainingTime();

        intervalId = setInterval(() => {
            updateRemainingTime();
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(intervalId);
    });
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
