<script>
    import router from 'page';
    import "./styles/app.css"
    import {authMiddleware} from "./middleware/auth";
    import {isLoggedIn} from './stores/auth.js';

    import Home from "./pages/Home.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import Header from "./components/Header.svelte";
    import Login from "./pages/auth/Login.svelte";
    import Register from "./pages/auth/Register.svelte";
    import {onDestroy} from "svelte";

    let page;
    let params;
    let currentRoute;

    let loggedIn = false;

    const unsubscribe = isLoggedIn.subscribe(value => {
        loggedIn = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

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

    router.start();
</script>

<main>
    <Header active={currentRoute} loggedIn={loggedIn} />
    <svelte:component this={page} {params}/>
</main>

<style>
    main {
        text-align: center;
    }
</style>
