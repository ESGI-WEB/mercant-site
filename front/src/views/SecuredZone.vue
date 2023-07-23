<script setup>
    import { inject } from 'vue';
    import { userKey, logoutKey } from '../services/authKeys';
    import {RouterLink} from "vue-router";

    const user = inject(userKey);
    const logout = inject(logoutKey);
</script>

<template>
    <nav>
        <div class="order">
            <RouterLink to="/">Purchase</RouterLink>
            <RouterLink to="/location">Renting</RouterLink>
            <RouterLink to="/order">Orders</RouterLink>
        </div>
        <div class="logo">
            YachtMasters
        </div>
        <div class="account">
            <template v-if="user.role === 'Administrator'">
                <RouterLink to="/products">Products</RouterLink>
                <RouterLink to="/user">Users</RouterLink>
            </template>
            <RouterLink to="/account"><span class="material-symbols-outlined">person</span></RouterLink>
            <a @click="logout"><span class="material-symbols-outlined">logout</span></a>
        </div>
    </nav>
    <RouterView/>
</template>

<style scoped>

    nav {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 30px 0 30px;

        > a, div {
            font-family: Arial;
            font-size: 1.8rem;
            flex: 1;
        }

        .logo {
            text-align: center;
            color : #18c0d6;
        }
    }

    .account {
        display: flex;
        gap: 40px;
        justify-content: flex-end;
        align-items: center;

       > a {
           color: inherit;
           font-family: Mark-Light;
           text-decoration: inherit;
       }
    }

    .order {
        display: flex;
        justify-content: flex-start;
        gap: 40px;
        align-items: center;

        > a {
            color: inherit;
            font-family: Mark-Light;
            text-decoration: inherit;
        }
    }

    a {
        cursor: pointer;
    }

</style>
