import router from "page"

export async function authMiddleware(ctx, next) {
    const token = localStorage.getItem("token");

    if (!token) {
        return router.redirect("/inloggen");
    }

    try {
        const [header, payload, signature] = token.split(".");

        const decodedPayload = JSON.parse(atob(payload));
        if (!header || !payload || !signature) {
            console.error("Invalid token structure")
        }

        const currentTime = Date.now() / 1000;
        if (decodedPayload.exp && decodedPayload.exp < currentTime) {
            return router.redirect("/inloggen");
        }

        await next();
    } catch (error) {
        console.error("Error decoding token:", error);
        return router.redirect("/inloggen");
    }
}