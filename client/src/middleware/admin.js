import {authMiddleware} from "./auth.js";

export async function adminMiddleware(ctx, next) {
    return authMiddleware(ctx, next, "admin");
}