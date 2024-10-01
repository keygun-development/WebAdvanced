<script>
    import router from 'page';
    import "./styles/app.css"
    import {authMiddleware} from "./middleware/auth";
    import Home from "./pages/Home.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import Header from "./components/Header.svelte";
    import Login from "./pages/auth/Login.svelte";
    import Register from "./pages/auth/Register.svelte";
    import GameSlug from "./pages/games/Slug.svelte"

    let page;
    let params;
    let currentRoute;

    router('/', (ctx) => {
        page = Home;
        currentRoute = ctx.pathname;
    });

    router('/inloggen', (ctx) => {
        page = Login;
        currentRoute = ctx.pathname;
        params = ctx;
    })

    router('/registreren', (ctx) => {
        page = Register;
        currentRoute = ctx.pathname;
        params = ctx;
    })

    router('/dashboard', authMiddleware, (ctx) => {
        page = Dashboard;
        currentRoute = ctx.pathname;
        params = ctx;
    })

    router('/games/:slug', (ctx) => {
        page = GameSlug;
        currentRoute = ctx.pathname;
        params = ctx;
    })

    router.start();
</script>
<header>
    <Header active={currentRoute}/>
</header>
<main class="flex flex-row bg-gray-50 min-h-[calc(100vh-80px)]">
    <svelte:component this={page} {params}/>
</main>
