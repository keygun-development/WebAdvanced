export class AccessToken {
    constructor() {
        this.payload = null;
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found in local storage");
            return;
        }

        const [header, payload, signature] = token.split(".");

        if (!header || !payload || !signature) {
            console.error("Invalid token structure");
            return;
        }

        try {
            this.payload = JSON.parse(atob(payload));
        } catch (e) {
            console.error("Error parsing token payload", e);
        }
    }
}
