import {writable} from 'svelte/store';

const isAuthenticated = writable(false);
const user = writable(null);

export {isAuthenticated, user};