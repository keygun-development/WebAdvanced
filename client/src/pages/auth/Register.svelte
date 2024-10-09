<script>
    import router from 'page';
    import isAuthenticated from "../../stores/auth.js";

    let username = '';
    let password = '';
    let message = '';

    async function registerUser() {
        try {
            const response = await fetch('http://localhost:3000/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const response = await fetch('http://localhost:3000/tokens', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    router.show('/dashboard');
                } else {
                    message = data.message;
                }
            } else {
                message = data.message || 'Error registering user.';
            }
        } catch (error) {
            message = 'Error registering user.';
        }
    }
</script>

<div class="flex justify-center items-center w-full">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md my-4">
        <h2 class="text-2xl font-bold text-center mb-6">Registreren</h2>
        <form on:submit|preventDefault={registerUser} class="space-y-6">
            <div>
                <label for="username" class="block text-sm font-medium text-gray-700">Gebruikersnaam</label>
                <input id="username" type="text" bind:value={username}
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       placeholder="Vul je gebruikersnaam in" required />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Wachtwoord</label>
                <input id="password" type="password" bind:value={password}
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       placeholder="Vul je wachtwoord in" required />
            </div>

            <div>
                <button type="submit"
                        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Registreren
                </button>
            </div>
        </form>

        <p class="text-center text-red-500 mt-4">{message}</p>
    </div>
</div>