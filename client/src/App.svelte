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
    import MyBids from "./pages/MyBids.svelte"
    import {AccessToken} from "./hooks/AccessToken";
    import isAuthenticated from "./stores/auth.js"

    const token = new AccessToken();
    const currentTime = Math.floor(Date.now() / 1000);

    if (token.payload) {
        isAuthenticated.set(true);
    }

    if (token.payload && token.payload.exp && token.payload.exp < currentTime) {
        isAuthenticated.set(false);
        token.remove();
    }

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

    router('/mijn-biedingen', (ctx) => {
        page = MyBids;
        currentRoute = ctx.pathname;
        params = ctx;
    })

    router.start();
</script>
<header class="bg-background shadow-2xl">
    <Header active={currentRoute}/>
</header>
<main class="flex flex-row bg-background/90 min-h-[calc(100vh-80px)]">
    <svelte:component this={page} {params}/>
</main>
