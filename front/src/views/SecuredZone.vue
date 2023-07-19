<script setup>
    import { inject } from 'vue';
    import { userKey, logoutKey } from '../services/authKeys';
    import {RouterLink} from "vue-router";

    const user = inject(userKey);
    const logout = inject(logoutKey);
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/renting">Renting</RouterLink>
        <RouterLink to="/location">Purchase</RouterLink>
        <RouterLink to="/order">Orders</RouterLink>
        <template v-if="user.role === 'Administrator'">
            <RouterLink to="/products">Products</RouterLink>
            <RouterLink to="/user">Users</RouterLink>
        </template>
        <RouterLink to="/account">Account</RouterLink>
    </nav>
        Connected as {{ user.email }}
        <a @click="logout">Logout</a>
</template>