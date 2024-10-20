import {AccessToken} from "../hooks/AccessToken.js";
import router from "page";
import {isAuthenticated, user} from "../stores/auth.js";

export async function authMiddleware(ctx, next, requiredRole = null) {
    try {
        const token = new AccessToken();
        const currentTime = Math.floor(Date.now() / 1000);

        if (!token.payload) {
            return router.redirect("/inloggen");
        }

        if (token.payload.exp && token.payload.exp < currentTime) {
            isAuthenticated.set(false);
            user.set(null)
            return router.redirect("/inloggen");
        }

        if (requiredRole && !token.payload.sub.role.includes(requiredRole)) {
            return router.redirect("/");
        }

        isAuthenticated.set(true)
        user.set(token.payload.sub)
        await next();
    } catch (error) {
        console.error("Error decoding token:", error);
        return router.redirect("/inloggen");
    }
}