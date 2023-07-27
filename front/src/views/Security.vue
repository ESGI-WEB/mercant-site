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
        background: url("https://www.sunreef-yachts.com/images/c027f733957624860558b5cd2cb273a1beb19ee4/src/525,untitled-2.jpg?3.8.0.8393.213?3.8.0.8393.213");
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
