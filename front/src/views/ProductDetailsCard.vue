<template>
    <div class="product-details">
        <div class="yacht-image">
            <img :src="product.image" alt="Product Image" />
        </div>
        <div class="presentation">
            <div class="description">
                <div class="title">{{ product.title }}</div>
                <div>{{ product.description }}</div>
                <form @submit.prevent="addToCart">
                    <div class="basket">
                        <div>
                            <input v-model.number="quantity"
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="Add to cart"
                            />
                        </div>
                        <div class="add-button">
                            <button type="submit" class="searchButton">Add</button> <!-- Use type="submit" to submit the form -->
                        </div>
                    </div>
                </form>
            </div>
            <div class="price">{{ product.price }}</div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { findProductById } from '../services/product'
import {addProductToCart, editQuantityOrderProduct, findProductsByOrderId, getOrderProducts} from '../services/order'
import store from "../store/store";

const productId = ref(null)
const product = ref({})
const quantity = ref(1)
const order = inject('order')
const oldQuantity = ref(null)

onMounted(async () => {
    const route = useRoute()
    if (route && route.params && route.params.id && order.value != null) {
        productId.value = route.params.id
        product.value = await findProductById(productId.value)
        if (order.value.id != null) {
            const products = await getOrderProducts(order.value.id)
            const productQuantity = products.find((p) => p.id === parseInt(productId.value)).quantity
            if (productQuantity > 1) {
                quantity.value = productQuantity
                oldQuantity.value = productQuantity
            }
        }
    }
})

async function addToCart() {
    if (order.value.id != null && productId.value != null) {
        const products = await findProductsByOrderId(order.value.id);
        const isProductFound = products.some(product => product.id === parseInt(productId.value));
        if (isProductFound) {
            await editQuantityOrderProduct(order.value.id, productId.value, { quantity: quantity.value })
            const quantityToAdd = quantity.value - oldQuantity.value
            store.numberOfProductsInCart += quantityToAdd
        } else {
            const productData = {
                ProductId: product.value.id,
                quantity: quantity.value
            }
            await addProductToCart(order.value.id, productData)
            store.numberOfProductsInCart += quantity.value
        }
    }
}
</script>

<style>
.product-details {
    padding: 50px;
    display: flex;
    flex-direction: row;
    height: calc(100vh - 70px);
    gap: 50px;
    background-color: #f4f5f5ff;
}

.yacht-image {
    width: 60%;
    height: 100%;

    > img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.presentation {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 40%;
    justify-content: space-between;
}

.description {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
}

.title {
    font-family: Mark-Bold;
    font-size: 1.5rem;
}

.price {
    width: 20%;
}

.basket {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.add-button button {
    cursor: pointer;
}
</style>
