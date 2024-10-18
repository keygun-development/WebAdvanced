<script>
    import {onMount} from "svelte";
    import Dialog from "../../components/Dialog.svelte";
    import Button from "../../components/Button.svelte";

    let currentGame = {};
    let dialogIsShowing = false;
    let dialogBidder = null;

    onMount(async () => {
        const response = await fetch("http://localhost:3000/games/" + params.params.slug);
        currentGame = await response.json();
    })

    const removeBidder = async (id) => {
        const response = await fetch("http://localhost:3000/games/" + currentGame.id + "/bidders/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });

        if (response.ok) {
            currentGame.auction.bidders = currentGame.auction.bidders.filter(b => b.id !== id)
            dialogIsShowing = false
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const endDate = formData.get("endDate") ?? currentGame.auction.endDate;

        const response = await fetch("http://localhost:3000/games/" + currentGame.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                title: formData.get("title"),
                image: formData.get("image"),
                description: formData.get("description"),
                auction: {
                    endDate: new Date(endDate).toISOString()
                }
            })
        });

        if (response.ok) {
            currentGame.title = formData.get("title");
            currentGame.image = formData.get("image");
            currentGame.description = formData.get("description");
            currentGame.auction.endDate = new Date(endDate).toISOString();
        }
    }

    export let params;
</script>
<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 w-full py-12 px-4">
    {#if Object.keys(currentGame).length > 0}
        <h1 class="text-4xl text-primary">
            {currentGame.name}
        </h1>
        <form on:submit={handleSubmit} class="flex flex-col mt-4" method="POST">
            <div class="grid md:grid-cols-3 gap-4">
                <div class="relative w-full flex flex-col">
                    <label for="title" class="text-white">
                        Titel van game:
                    </label>
                    <input name="title"
                           class="p-2 rounded w-full mt-2"
                           value={currentGame.name}
                           type="text"
                           placeholder="Titel van game"/>
                    <label for="image" class="text-white mt-4">
                        Afbeelding (via url):
                    </label>
                    <input name="image"
                           class="p-2 rounded w-full mt-2"
                           value={currentGame.image}
                           type="text"
                           placeholder="Voorbeeld: https://image.api.playstation.com/vulcan/ap/rnd/202406/1421/5811b9a8ab59c7703c3d4f0a60748c029208aed35f28d7f3.png"/>
                </div>
                <div class="flex flex-col justify-between">
                    <div>
                        <label for="endDate" class="text-white">
                            Eind datum/tijd
                        </label>
                        <input
                                class="p-2 rounded w-full mt-2 mb-4"
                                name="endDate"
                                value={new Date(currentGame.auction.endDate).toLocaleString("sv-SE", {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(' ', 'T')}
                                type="datetime-local"
                        />
                        <label for="description" class="text-white">
                            Beschrijving:
                        </label>
                        <textarea
                                class="p-2 rounded w-full mt-2"
                                rows="4"
                                name="description"
                                placeholder="Beschrijving"
                        >{currentGame.description}</textarea>
                    </div>
                </div>
                <div class="flex flex-col h-full max-h-[400px] divide-y overflow-auto bg-background/10">
                    {#each currentGame.auction.bidders as bidder}
                        <div class="flex justify-between items-center p-4 {bidder.newBidder ? 'animate-fly-in' : ''} duration-100">
                            <p class="text-white">
                                {bidder.name}
                            </p>
                            <div class="flex items-center gap-2">
                                <p class="text-white">
                                    €{bidder.amount}
                                </p>
                                <button type="button" on:click={() => {
                                    dialogIsShowing = true
                                    dialogBidder = bidder
                                }} class="bg-red-500 hover:bg-red-500/80 duration-300 p-2 text-white rounded">
                                    Verwijderen
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="flex justify-end">
                <input type="submit"
                       value="Opslaan"
                       class="py-2 px-4 bg-secondary text-white hover:bg-secondary/90 cursor-pointer duration-300 transition-all mt-4"
                />
            </div>
        </form>
    {/if}
    {#if dialogIsShowing}
        <Dialog>
            <p class="text-center">
                Weet u zeker dat u de bieding van {dialogBidder.name} van €{dialogBidder.amount} wilt verwijderen?
            </p>
            <div class="flex space-x-2 items-center justify-center mt-2">
                <Button variant="error" on:click={() => removeBidder(dialogBidder.id)}>
                    Verwijderen
                </Button>
                <Button on:click={(event) => {
                    event.preventDefault()
                    dialogIsShowing = false
                }} variant="success">
                    Annuleren
                </Button>
            </div>
        </Dialog>
    {/if}
</div>