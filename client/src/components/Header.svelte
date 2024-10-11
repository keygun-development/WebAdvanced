<script>
    import logo from "../assets/logo.png";
    import router from "page"
    import isAuthenticated from '../stores/auth.js';
    import {AccessToken} from "../hooks/AccessToken.js";

    let dropDown;
    const token = new AccessToken();
    const logout = () => {
        token.remove();
        isAuthenticated.set(false);
        router.show('/inloggen');
    }

    const showDropDown = () => {
        dropDown.classList.toggle('hidden');
    }

    export let active;
    export let user;
</script>
<nav class="flex items-center justify-between h-20 md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0">
    <ul class="h-full">
        <li class="h-full">
            <a class="flex items-center h-full" href="/">
                <img class="inline-flex h-full" src={logo} alt="Svelte Logo"/>
                <p class="text-4xl text-primary ">
                    Game <span class="text-secondary">Veilingen</span>
                </p>
            </a>
        </li>
    </ul>
    <ul class="flex space-x-2">
        {#if !$isAuthenticated}
            <li><a class:underline={active === "/inloggen"} class="text-primary" href="/inloggen">Inloggen</a></li>
            <li><a class:underline={active === "/registreren"} class="text-secondary"
                   href="/registreren">Registreren</a></li>
        {/if}
        {#if $isAuthenticated}
            <li><a class:font-semibold={active === "/mijn-biedingen"} class="text-primary" href="/mijn-biedingen">Mijn
                biedingen</a></li>
            <li class="relative">
                <button class="text-secondary" on:click={showDropDown}>
                    Mijn account
                </button>
                <ul class="hidden absolute bg-white divide-y divide-black w-40 rounded shadow-inner mt-2"
                    bind:this={dropDown}>
                    <li class="py-2 px-4">
                        <a class="flex" href="/mijn-profiel">
                            Mijn profiel
                        </a>
                    </li>
                    {#if user.role === "admin"}
                        <li class="py-2 px-4">
                            <a class="flex" href="/dashboard">
                                Dashboard
                            </a>
                        </li>
                    {/if}
                    <li class="py-2 px-4">
                        <button class="w-full text-left" on:click={logout}>
                            Uitloggen
                        </button>
                    </li>
                </ul>
            </li>
        {/if}
    </ul>
</nav>