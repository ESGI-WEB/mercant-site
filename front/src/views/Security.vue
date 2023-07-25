<script setup>
    import { inject } from 'vue';
    import { loginKey, registerKey } from '../services/authKeys';
    import LoginForm from '../components/LoginForm.vue';
    import UserForm from '../components/UserForm.vue';

    const login = inject(loginKey);
    const register = inject(registerKey);
</script>

<template>
    <div class="flex-content">
        <nav>
            <div class="logo">
                YachtMasters
            </div>
        </nav>

        <div class="forms">
            <LoginForm :on-submit="login" />
            <UserForm :on-submit="register" />
        </div>
    </div>

</template>


<style scoped>

    nav {
        height: 70px;
        background-color : white;
        display: flex;
        align-items: center;
        justify-content: center;

        > div {
            color : #18c0d6;
            font-family: Arial;
            font-size: 1.8rem;
        }
    }

    .forms {
        background: url("../assets/images/home.webp");
        background-size: cover;
        background-position: center;
        flex: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 100px;
    }

    .flex-content {
        background: rgba(10,10,10,.4);
        min-height: 100vh;
        flex-direction: column;
        display: flex;
    }

</style>
