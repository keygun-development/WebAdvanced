import router from 'page';

export async function authMiddleware(ctx, next) {
    try {
        const response = await fetch('/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            next();
        } else {
            router.redirect('/inloggen');
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
        router.redirect('/inloggen');
    }
}