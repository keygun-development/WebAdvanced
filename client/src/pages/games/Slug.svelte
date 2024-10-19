<script>
    import {onDestroy, onMount} from "svelte"
    import {isAuthenticated, user} from "../../stores/auth.js";
    import IncDecPrice from "../../components/IncDecPrice.svelte";
    import AuctionTime from "../../components/AuctionTime.svelte";
    import Dialog from "../../components/Dialog.svelte";
    import router from "page";
    import Button from "../../components/Button.svelte";
    import Toast from "../../components/Toast.svelte";

    let error = "";
    let currentGame = {};
    let sortedBidders = [];
    let dialogIsShowing = false;
    let eventSource;

    onMount(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/games/" + params.params.slug);
            currentGame = await response.json();
            if (response.ok) {
                sortedBidders = currentGame.auction.bidders.sort((a, b) => b.amount - a.amount);

                eventSource = new EventSource(`http://localhost:3000/games/events/${params.params.slug}`);

                eventSource.addEventListener("message", (event) => {
                    const newBidder = JSON.parse(event.data);
                    newBidder.newBidder = true;
                    sortedBidders = [newBidder, ...sortedBidders].sort((a, b) => b.amount - a.amount);
                    currentGame.auction.currentPrice = newBidder.amount;

                    setTimeout(() => {
                        sortedBidders = sortedBidders.map(bidder => ({
                            ...bidder,
                            newBidder: false
                        }));
                    }, 1000);
                });

                eventSource.addEventListener("error", () => {
                    eventSource.close();
                });

                return () => {
                    eventSource.close();
                };
            } else {
                error = currentGame.message
            }
        };

        fetchData();
        return () => {
        };
    });

    onDestroy(() => {
        sortedBidders = [];
        eventSource.close();
    });

    const removeItem = async (id) => {
        const response = await fetch("http://localhost:3000/games/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

        if (response.ok) {
            router.show('/');
        }
    }

    export let params;
</script>

<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 w-full py-12 px-4">
    {#if error}
        <Toast variant="error">
            {error}
        </Toast>
    {/if}
    {#if Object.keys(currentGame).length > 0 && !error}
        <div class="flex items-center justify-between">
            <h1 class="text-4xl text-primary">
                {currentGame.name}
            </h1>
            {#if $user !== null && $user.role.includes("admin")}
                <div class="flex items-center space-x-2">
                    <Button as="a" variant="blue" href={"/games/"+currentGame.slug+"/edit"}>Bewerken</Button>
                    <Button on:click={() => dialogIsShowing = true} variant="error">
                        Verwijderen
                    </Button>
                </div>
            {/if}
        </div>
        <div class="grid md:grid-cols-3 flex-col md:flex-row mt-4 gap-4">
            <div class="relative w-full flex-1">
                <img src={currentGame.image === "" ? "/assets/games/placeholder.png" : currentGame.image}
                     alt={currentGame.name}
                     class="relative inset-0 object-cover w-full h-full bg-black/50 duration-300 transition-all"/>
            </div>
            <div class="flex flex-col justify-between">
                <div>
                    <AuctionTime endDate={new Date(currentGame.auction.endDate)}/>
                    <p class="text-lg text-white mt-2">
                        {currentGame.description}
                    </p>
                </div>
                {#if new Date(currentGame.auction.endDate) < new Date()}
                    <p class="text-white">
                        De bieding is verlopen u kunt niet meer bieden.
                    </p>
                {:else}
                    {#if $isAuthenticated}
                        <IncDecPrice item={currentGame}/>
                    {:else}
                        <p class="text-white">
                            U moet <a href="/inloggen" class="underline-offset-4 underline text-primary">inloggen</a> om
                            te
                            bieden.
                        </p>
                    {/if}
                {/if}
            </div>
            <div class="flex flex-col h-full max-h-[400px] divide-y overflow-auto bg-background/10">
                {#each sortedBidders as bidder}
                    <div class="flex justify-between items-center p-4 {bidder.newBidder ? 'animate-fly-in' : ''} duration-100">
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
    {#if dialogIsShowing}
        <Dialog>
            <p class="text-center">
                Weet u zeker dat u {currentGame.name} wilt verwijderen als bieding?
            </p>
            <div class="flex space-x-2 items-center justify-center mt-2">
                <Button variant="error" on:click={() => removeItem(currentGame.id)}>
                    Verwijderen
                </Button>
                <Button on:click={() => dialogIsShowing = false} variant="success">
                    Annuleren
                </Button>
            </div>
        </Dialog>
    {/if}
</div>
