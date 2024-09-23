import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);

export const checkAuth = async () => {
    try {
        const response = await fetch('/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        isLoggedIn.set(response.ok);
    } catch (error) {
        console.error("Error checking authentication:", error);
        isLoggedIn.set(false);
    }
};

checkAuth();