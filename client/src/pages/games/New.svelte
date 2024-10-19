<script>
    import Select from "../../components/Select.svelte";
    import {onMount} from "svelte";
    import router from "page"
    import Toast from "../../components/Toast.svelte";
    import Button from "../../components/Button.svelte";

    let error = null;
    let title = "";
    let genre = "";
    let description = "";
    let image = "";
    let producer = "";
    let consoles = "";
    let startingPrice = "";
    let endDate = "";
    let genres = []

    onMount(async () => {
        const response = await fetch("http://localhost:3000/genres/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        genres = await response.json();
    })

    const handleSubmit = async (event) => {
        error = null;
        const formData = new FormData(event.target);

        try {
            const response = await fetch("http://localhost:3000/games/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    title: formData.get("title"),
                    genre: formData.get("genre"),
                    description: formData.get("description"),
                    image: formData.get("image"),
                    producer: formData.get("producer"),
                    consoles: formData.get("consoles"),
                    startingPrice: formData.get("startingPrice"),
                    endDate: formData.get("endDate")
                })
            });

            const data = await response.json();

            if (response.ok) {
                router.show("/dashboard")
            } else {
                error = data.message
            }
        } catch (e) {
            error = e.message
        }
    }
</script>
<div class="md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 w-full py-12 px-4">
    <h1 class="text-4xl text-primary">
        Nieuwe veiling
    </h1>
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col mt-4" method="POST">
        <div class="grid md:grid-cols-2 gap-4">
            <div class="relative w-full flex flex-col gap-y-4">
                <div>
                    <label for="title" class="text-white">
                        Titel van game:
                    </label>
                    <input name="title"
                           class="p-2 rounded w-full mt-2"
                           bind:value={title}
                           type="text"
                           required
                           placeholder="Titel van game"/>
                </div>
                <div class="flex flex-col">
                    <label for="genre" class="text-white mb-2">
                        Genre:
                    </label>
                    <Select
                            on:change={e => genre = e.detail.value}
                            name="genre"
                            options={genres.map(genre => {
                                return {
                                    value: genre.name,
                                    label: genre.name
                                }
                            })}
                            disabledOption={
                        {value: "", label: "Kies een genre", selected: true}
                        }
                    />
                </div>
                <div>
                    <label for="image" class="text-white">
                        Afbeelding (via url):
                    </label>
                    <input name="image"
                           class="p-2 rounded w-full mt-2"
                           bind:value={image}
                           type="text"
                           placeholder="Voorbeeld: https://image.api.playstation.com/vulcan/ap/rnd/202406/1421/5811b9a8ab59c7703c3d4f0a60748c029208aed35f28d7f3.png"/>
                </div>
                <div>
                    <label for="producer" class="text-white">
                        Uitgever:
                    </label>
                    <input name="producer"
                           class="p-2 rounded w-full mt-2"
                           bind:value={producer}
                           type="text"
                           required
                           placeholder="Voorbeeld: Treyarch"/>
                </div>
                <div>
                    <label for="consoles" class="text-white">
                        Beschikbaar op consoles:
                    </label>
                    <input name="consoles"
                           class="p-2 rounded w-full mt-2"
                           bind:value={consoles}
                           type="text"
                           required
                           placeholder="Scheiden met komma's voorbeeld: Playstation 4, Xbox 360, Pc"/>
                </div>
            </div>
            <div class="flex flex-col gap-y-4">
                <div>
                    <label for="endDate" class="text-white">
                        Eind datum/tijd
                    </label>
                    <input
                            class="p-2 rounded w-full mt-2"
                            name="endDate"
                            bind:value={endDate}
                            type="datetime-local"
                            required
                    />
                </div>
                <div>
                    <label for="description" class="text-white">
                        Beschrijving:
                    </label>
                    <textarea
                            class="p-2 rounded w-full mt-2"
                            rows="4"
                            name="description"
                            bind:value={description}
                            placeholder="Beschrijving"
                    ></textarea>
                </div>
                <div>
                    <label for="startingPrice" class="text-white">
                        Startprijs:
                    </label>
                    <input
                            class="p-2 rounded w-full mt-2"
                            name="startingPrice"
                            bind:value={startingPrice}
                            type="number"
                            required
                            placeholder="Startprijs"/>
                </div>
            </div>
            {#if error}
                <Toast variant="error">
                    {error}
                </Toast>
            {/if}
        </div>
        <div class="flex justify-end">
            <Button type="submit" variant="secondary">
                Opslaan
            </Button>
        </div>
    </form>
</div>