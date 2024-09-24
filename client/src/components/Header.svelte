<script>
    import logo from "../assets/svelte.png";
    import router from "page"
    import {isLoggedIn, checkAuth} from '../stores/auth.js';

    const logout = () => {
        localStorage.removeItem('token');
        isLoggedIn.set(false);
        checkAuth();
        router.show('/inloggen');
    }

    export let active;
    export let loggedIn;
</script>
<nav class="flex items-center justify-between h-[80px] md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0">
    <ul class="h-full">
        <li class="h-full">
            <a class="block h-full" href="/">
                <img class="inline-flex h-full" src={logo} alt="Svelte Logo"/>
            </a>
        </li>
    </ul>
    <ul class="flex space-x-2">
        {#if !loggedIn}
            <li><a class:font-semibold={active === "/inloggen"} href="/inloggen">Inloggen</a></li>
            <li><a class:font-semibold={active === "/registreren"} href="/registreren">Registreren</a></li>
        {/if}
        {#if loggedIn}
            <li>
                <button on:click={logout}>
                    Uitloggen
                </button>
            </li>
        {/if}
    </ul>
</nav>