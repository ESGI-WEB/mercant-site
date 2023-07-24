<template>
    <div class="title-cart">
        Cart
    </div>
    <div class="cart">
        <div class="recap-products">
            <div class="products-card-item" v-if="products.length > 0">
                <div class="product-card-item" v-for="product in products" :key="product.id">
                    <ProductCartItem @click="handleProductClicked(product)" :product="product" />
                </div>
            </div>
        </div>
        <div class="section-recap">
            <div class="min-recap-products">
                <div>quantité</div>
                <div>product</div>
            </div>
            <div class="total-price">
                <div>
                    {{ order.totalPrice}}
                </div>
                <div>
                    {{ order.currency}}
                </div>
            </div>
        </div>

    </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {findOrderById, findProductsByOrderId} from "../services/order";
import ProductCartItem from "./ProductCartItem.vue";
import ProductCard from "./ProductCard.vue";

const order = ref({})
const products = ref({})

onMounted(async () => {
    const route = useRoute()
    if (route && route.params && route.params.id) {
        const orderId = route.params.id
        order.value = await findOrderById(orderId)
        products.value = await findProductsByOrderId(orderId)
    }
})

</script>

<style scoped>

.cart {
    display: flex;
    flex-direction: row;
    gap: 50px;
    padding: 30px;
}

.min-recap-products {
    display: flex;
    flex-direction: row;
}

.section-recap {
    display: flex;
    flex-direction: column;
    width: 30%;
}

.recap-products {
    display: flex;
    flex-direction: column;
    width: 70%;
}

.total-price {
    display: flex;
    flex-direction: row;
}

.product-card-item {
    display: flex;
    flex-direction: row;
    height: 150px;
    gap: 20px;
    max-width: 600px;
    border: 1px solid black;
    border-radius: 20px;
    padding: 5px;
}

.products-card-item {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.title-cart {
    margin: 30px 0 30px 0;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
}

</style>
