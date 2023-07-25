<template>
    <div class="title-cart">
        Cart
    </div>
    <div class="cart">
        <div class="recap-products">
            <div class="products-card-item" v-if="products.length > 0">
                <div class="product-card-item"  @click="handleProductClicked(product)" v-for="product in products" :key="product.id">
                    <ProductCartItem :product="product" />
                </div>
            </div>
        </div>
        <div class="section-recap">
            <div class="total">
                Total
            </div>
            <div class="min-recap-products" v-for="product in products" :key="product.id">
                <div>{{ product.title }}</div>
                <div>x {{ product.quantity }}</div>
            </div>
            <div class="total-price">
                <div>
                    {{ order.totalPrice}}
                </div>
                <div>
                    {{ order.currency}}
                </div>
            </div>
            <div class="pay">
                Pay
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
import router from "../router";

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

function handleProductClicked(product) {
    router.push({ name: 'ProductDetailsCard', params: { id: product.id } });
}

</script>

<style scoped>

.cart {
    display: flex;
    flex-direction: row;
    gap: 50px;
    padding: 50px;
}

.min-recap-products {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.section-recap {
    display: flex;
    flex-direction: column;
    width: 30%;
    gap: 30px;
}

.recap-products {
    display: flex;
    flex-direction: column;
    width: 70%;
}

.total-price {
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: white;
    background-color: black;
    padding: 5px;
    border-radius: 10px;
}

.product-card-item {
    cursor: pointer;
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

.total {
    font-size:  1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pay {
    background: transparent;
    border: 2px #18c0d6 solid;
    cursor: pointer;
    color: #18c0d6;
    font-weight: bold;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
