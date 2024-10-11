import router from "page"
import {AccessToken} from "../hooks/AccessToken.js";
import isAuthenticated from "../stores/auth.js";

export async function adminMiddleware(ctx, next) {
    try {
        const token = new AccessToken();
        const currentTime = Math.floor(Date.now() / 1000);

        if (!token.payload) {
            return router.redirect("/inloggen");
        }

        if (token.payload.exp && token.payload.exp < currentTime) {
            isAuthenticated.set(false);
            return router.redirect("/inloggen");
        }

        if (token.payload.sub.role !== "admin") {
            return router.redirect("/mijn-profiel");
        }

        isAuthenticated.set(true)
        await next();
    } catch (error) {
        console.error("Error decoding token:", error);
        return router.redirect("/inloggen");
    }
}