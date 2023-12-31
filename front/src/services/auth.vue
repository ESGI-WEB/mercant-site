<template>
    <slot v-bind:user="user"></slot>
</template>

<script setup>
    import { onMounted, provide, ref } from 'vue';
    import { userKey, loginKey, logoutKey, registerKey } from './authKeys';
    import router from "../router";

    const API_BASE_URL = import.meta.env.VITE_BASE_URL

    const user = ref(null);

    onMounted(() => {
        const token = localStorage.getItem('token');
        if (token) {
            user.value = JSON.parse(atob(token.split('.')[1]));
        }
    });

    async function login({ email, password }) {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.status === 422) {
                const data = await response.json();
                return Promise.reject(data);
            }

            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            user.value = JSON.parse(atob(token.split('.')[1]));
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    function logout() {
        localStorage.removeItem('token');
        user.value = null;
        router.push({ name: 'home' });
    }

    async function register(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.status === 422) {
                const data = await response.json();
                return Promise.reject(data);
            }

            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            user.value = JSON.parse(atob(token.split('.')[1]));
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    provide(userKey, user);
    provide(loginKey, login);
    provide(logoutKey, logout);
    provide(registerKey, register);
</script>
