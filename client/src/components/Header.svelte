<script>
    import logo from "../assets/logo.png";
    import router from "page"
    import isAuthenticated from '../stores/auth.js';
    import {AccessToken} from "../hooks/AccessToken.js";

    const token = new AccessToken();
    const logout = () => {
        token.remove();
        isAuthenticated.set(false);
        router.show('/inloggen');
    }

    export let active;
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
            <li><a class:underline={active === "/registreren"} class="text-secondary" href="/registreren">Registreren</a></li>
        {/if}
        {#if $isAuthenticated}
            <li><a class:font-semibold={active === "/mijn-biedingen"} href="/mijn-biedingen">Mijn biedingen</a></li>
            <li>
                <button on:click={logout}>
                    Uitloggen
                </button>
            </li>
        {/if}
    </ul>
</nav>