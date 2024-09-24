import {writable} from 'svelte/store';

export const isLoggedIn = writable(false);

export const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        isLoggedIn.set(false);
        return;
    }

    try {
        const response = await fetch('/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            isLoggedIn.set(true);
        } else {
            isLoggedIn.set(false);
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
        isLoggedIn.set(false);
    }
};

checkAuth();