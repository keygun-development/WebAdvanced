<script>
    import router from "page";
    import logo from "../assets/logo.png";
    import {isAuthenticated, user} from '../stores/auth.js';
    import {AccessToken} from "../hooks/AccessToken.js";

    let dropDown;
    let isOpen = false;
    const token = new AccessToken();
    const logout = () => {
        token.remove();
        isAuthenticated.set(false);
        user.set(null);
        router.show('/inloggen');
    }

    const showDropDown = () => {
        dropDown.classList.toggle('hidden');
    }

    const toggleHamburger = () => {
        isOpen = !isOpen;
    };

    export let active;
</script>
<div class="flex items-center justify-between h-20 md:px-10 mx-auto xl:px-20 2xl:max-w-[1280px] 2xl:px-0 px-4">
    <a class="flex items-center h-full" href="/">
        <img class="inline-flex h-full" src={logo} alt="Gameveilingen logo"/>
        <p class="md:text-4xl text-2xl text-primary">
            Game <span class="text-secondary">Veilingen</span>
        </p>
    </a>
    <nav class="hidden md:flex items-center">
        <ul class="flex space-x-2">
            {#if !$isAuthenticated}
                <li><a class:underline={active === "/inloggen"} class="text-primary" href="/inloggen">Inloggen</a></li>
                <li><a class:underline={active === "/registreren"} class="text-secondary"
                       href="/registreren">Registreren</a></li>
            {/if}
            {#if $isAuthenticated}
                <li>
                    <a class:underline={active === "/mijn-biedingen"} class="text-primary" href="/mijn-biedingen">
                        Mijn biedingen
                    </a>
                </li>
                <li class="relative">
                    <button class="text-secondary" on:click={showDropDown}>
                        Mijn account
                    </button>
                    <ul class="hidden absolute bg-white divide-y divide-black w-40 rounded shadow-inner mt-2"
                        bind:this={dropDown}>
                        {#if $user && $user.role.includes("admin")}
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

    <button
            on:click={toggleHamburger}
            class="relative flex flex-col justify-center items-center space-y-1 focus:outline-none w-5 h-5 md:hidden"
            aria-label="Toggle menu"
    >
        <div
                class="h-0.5 w-full bg-white transition-all duration-300 absolute top-0"
                class:top-[6px]={isOpen}
                class:rotate-45={isOpen}
        ></div>

        <div
                class="h-0.5 w-full bg-white left-0 transition-all duration-300 absolute top-[2px]"
                class:!-left-[20px]={isOpen}
                class:opacity-0={isOpen}
        ></div>

        <div
                class="h-0.5 w-full bg-white transition-all duration-300 absolute"
                class:top-[3px]={isOpen}
                class:-rotate-45={isOpen}
        ></div>
    </button>
</div>
<nav
        class="md:hidden"
        class:border-t={isOpen}
>
    {#if isOpen}
        <ul class="flex flex-col divide-y">
            {#if !$isAuthenticated}
                <li><a class:underline={active === "/inloggen"} class="text-primary p-4 flex"
                       href="/inloggen">Inloggen</a></li>
                <li><a class:underline={active === "/registreren"} class="text-secondary p-4 flex"
                       href="/registreren">Registreren</a></li>
            {/if}
            {#if $isAuthenticated}
                {#if $user && $user.role.includes("admin")}
                    <li>
                        <a class:underline={active === "/dashboard"} class="text-primary p-4 flex" href="/dashboard">
                            Dashboard
                        </a>
                    </li>
                {/if}
                <li>
                    <button class="w-full text-left text-primary p-4 flex" on:click={logout}>
                        Uitloggen
                    </button>
                </li>
            {/if}
        </ul>
    {/if}
</nav>
