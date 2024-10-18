<script>
    import router from 'page';
    import Button from "../../components/Button.svelte";
    let email = '';
    let password = '';
    let message = '';

    async function loginUser() {
        try {
            const response = await fetch('http://localhost:3000/tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                router.show('/dashboard');
            } else {
                message = data.message;
            }
        } catch (error) {
            message = 'Error logging in.';
        }
    }
</script>

<div class="flex justify-center items-center w-full">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md my-4">
        <h2 class="text-2xl font-bold text-center mb-6">Inloggen</h2>
        <form on:submit|preventDefault={loginUser} class="space-y-6">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" type="email" bind:value={email}
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       placeholder="Vul je email in" />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Wachtwoord</label>
                <input id="password" type="password" bind:value={password}
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       placeholder="Vul je wachtwoord in" />
            </div>
            <p class="text-xs text-gray-500">
                Heb je nog geen account? <a class="underline" href="/registreren">registreer je hier.</a>
            </p>
            <div class="flex justify-end">
                <Button type="submit" variant="blue">
                    Inloggen
                </Button>
            </div>
        </form>

        <p class="text-center text-red-500 mt-4">{message}</p>
    </div>
</div>
