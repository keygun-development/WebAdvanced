<script>
    import logo from "../assets/svelte.png";

    export let active;
    export let isLoggedIn;
</script>
<nav class="flex items-center justify-between h-[80px]">
    <ul class="h-full">
        <li class="h-full">
            <a class="block h-full" href="/">
                <img class="inline-flex h-full" src={logo} alt="Svelte Logo"/>
            </a>
        </li>
    </ul>
    <ul class="flex space-x-2">
        {#if !isLoggedIn}
            <li><a class:active={active === "/inloggen"} href="/inloggen">Inloggen</a></li>
            <li><a class:active={active === "/registreren"} href="/registreren">Registreren</a></li>
        {/if}
    </ul>
</nav>

<style>
    ul {
        list-style-type: none;
    }

    a.active {
        font-weight: bold;
    }
</style>