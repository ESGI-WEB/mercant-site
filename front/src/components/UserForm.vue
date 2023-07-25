<script setup>
import { reactive, ref, unref } from 'vue';

const props = defineProps({
    onSubmit: Function,
    initialValues: {
        type: Object,
        default: () => ({
            lastname: '',
            firstname: '',
            email: '',
            password: ''
        })
    }
});

const formData = reactive({ ...props.initialValues });
const errors = ref({});

const isSubmitting = ref(false);

function handleSubmit() {
    isSubmitting.value = true;
    props
        .onSubmit(formData)
        .then(() => {
            Object.assign(formData, {
                lastname: '',
                firstname: '',
                email: '',
                password: ''
            });
        })
        .catch((_errors) => {
            errors.value = _errors;
        })
        .finally(() => {
            isSubmitting.value = false;
        });
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div class="register">
            <p class="title">Don't have an account yet? Please register now.</p>
            <input
                    v-model="formData.lastname"
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Lastname"
            />
            <p v-if="errors.lastname">{{ errors.lastname }}</p>
            <input
                    v-model="formData.firstname"
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Firstname"
            />
            <p v-if="errors.firstname">{{ errors.firstname }}</p>
            <input v-model.trim="formData.email" type="email" id="email" name="email" placeholder="Email" />
            <p v-if="errors.email">{{ errors.email }}</p>
            <input
                    v-model="formData.password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
            />
            <p v-if="errors.password">{{ errors.password }}</p>
            <button :disabled="isSubmitting" type="submit">Registration</button>
        </div>
    </form>
</template>

<style scoped>

    .register {
        background-color: #1f2833;
        height: 520px;
        width: 420px;
        display: flex;
        flex-direction: column;
        padding: 40px;
        font-weight: bold;
        gap: 30px;
    }

    .title {
        font-size: 1.6rem;
        font-family: Arial;
        color: white;
    }

    input {
        background-color: white;
        height: 50px;
        border: 0;
        padding: 10px;

        &:hover {
            cursor: text;
        }
    }


    button {
        height:40px;
        background: transparent;
        border: 2px #18c0d6 solid;
        cursor: pointer;
        color: #18c0d6;
        font-weight: bold;
    }

</style>