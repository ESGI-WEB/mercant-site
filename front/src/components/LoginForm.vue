<script setup>
import { reactive, ref } from 'vue';

const props = defineProps({
    onSubmit: Function
});

const formData = reactive({
    email: '',
    password: ''
});
const errors = ref({});

const isSubmitting = ref(false);

function handleSubmit() {
    isSubmitting.value = true;
    props
        .onSubmit(formData)
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
        <div class="login">
            <p class="title">Already a customer?</p>
            <input v-model.trim="formData.email" type="email" id="email" name="email" placeholder="Email" />
            <p v-if="errors.email">{{ errors.email }}</p>
            <input
                    :value="formData.password"
                    @input="formData.password = $event.target.value"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
            />
            <p v-if="errors.password">{{ errors.password }}</p>
            <button :disabled="isSubmitting" type="submit">Submit</button>
        </div>
    </form>

</template>

<style scoped>

    .login {
        background-color: #f4f5f5;
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