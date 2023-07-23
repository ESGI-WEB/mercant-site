<template>
    <div class="product-details">
        <h1>{{ product.title }}</h1>
        <p>Price: {{ product.price }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { findProductById } from '../services/product';

const productId = ref(null);
const product = ref({});

import { onMounted } from 'vue';
import {useRoute} from "vue-router";

onMounted(async () => {
    const route = useRoute();
    if (route && route.params && route.params.id) {
        productId.value = route.params.id;
        product.value = await findProductById(productId.value);
    }
});
</script>

<style>
</style>
