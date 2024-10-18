<script>
    import router from 'page';
    import "./app.css"
    import {authMiddleware} from "./middleware/auth";
    import Home from "./pages/Home.svelte";
    import Dashboard from "./pages/auth/Dashboard.svelte";
    import Header from "./components/Header.svelte";
    import Login from "./pages/auth/Login.svelte";
    import Register from "./pages/auth/Register.svelte";
    import GameSlug from "./pages/games/Slug.svelte"
    import GameEdit from "./pages/games/Edit.svelte"
    import GameNew from "./pages/games/New.svelte"
    import {AccessToken} from "./hooks/AccessToken";
    import {isAuthenticated, user} from "./stores/auth.js"
    import MyProfile from "./pages/auth/MyProfile.svelte";
    import {adminMiddleware} from "./middleware/admin.js";

    const token = new AccessToken();
    const currentTime = Math.floor(Date.now() / 1000);

    if (token.payload) {
        isAuthenticated.set(true);
        user.set(token.payload.sub);
    }

    if (token.payload && token.payload.exp && token.payload.exp < currentTime) {
        isAuthenticated.set(false);
        user.set(null)
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

    router('/dashboard', adminMiddleware, (ctx) => {
        page = Dashboard;
        currentRoute = ctx.pathname;
        params = ctx;
    })

    router('/dashboard/auctions/new', adminMiddleware, (ctx) => {
        page = GameNew;
        currentRoute = ctx.pathname;
        params = ctx;
    })

    router('/mijn-profiel', authMiddleware, (ctx) => {
        page = MyProfile;
        currentRoute = ctx.pathname;
        params = ctx;
    })

    router('/games/:slug', (ctx) => {
        page = GameSlug;
        currentRoute = ctx.pathname;
        params = ctx;
    })

    router('/games/:slug/edit', adminMiddleware, (ctx) => {
        page = GameEdit;
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
