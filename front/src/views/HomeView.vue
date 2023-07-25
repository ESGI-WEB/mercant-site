<template>
    <form @submit.prevent="search">
        <div class="filter">
            <div class="name">
                <p>Name of yacht</p>
                <input v-model="formData.title" type="text" id="title" name="title" placeholder="Enter the name of the yacht" />
            </div>
            <div class="price">
                <p>Price</p>
                <div class="inputs">
                    <input v-model="formData.priceMin" type="number" id="price_min" name="priceMin" placeholder="Min" />
                    <input v-model="formData.priceMax" type="number" id="price_max" name="priceMax" placeholder="Max" />
                </div>
            </div>
            <button class="searchButton" type="submit">Search</button>
        </div>
    </form>
    <div class="products" v-if="products.length > 0">
        <div class="product-card" v-for="product in products" :key="product.id">
            <ProductCard @click="handleProductClicked(product)" :product="product" />
        </div>
    </div>

    <div class="else-products" v-else>
        No products to display.
    </div>

</template>

<script setup>
import {onMounted, reactive} from "vue";
import { findProductsByCriteria } from '../services/product';
import ProductCard from "../components/ProductCard.vue";
import router from "../router";

const formData = reactive({
    title: "",
    priceMin: null,
    priceMax: null
});

let products = reactive([]);

onMounted(async () => {
    const criteria = {}
    const newProducts = await findProductsByCriteria(criteria);
    products.push(...newProducts)
});

async function search() {
    try {
        const criteria = {};
        if (formData.title.trim() !== "") {
            criteria.title = formData.title.trim();
        }
        if (formData.priceMax != null){
            criteria.priceMax = formData.priceMax;
        }
        if (formData.priceMin != null){
            criteria.priceMin = formData.priceMin;
        }
        if (formData.priceMin != null && formData.priceMax != null && formData.priceMin >= formData.priceMax) {
            console.error('Minimum price must be less than maximum price.');
            return;
        }
        products = await findProductsByCriteria(criteria);
        formData.priceMin = null;
        formData.priceMax = null;
        formData.title = "";
    } catch (error) {
        console.error('Error on getting products :', error);
    }
}

function handleProductClicked(product){
    router.push({ name: 'ProductDetailsCard', params: { id: product.id } });
}

</script>

<style scoped>
.filter {
    background-color: #1f2833;
    display: flex;
    justify-content: space-between;
    padding: 30px;
    color: white;
    align-items: flex-end;
}

p {
    font-size: 1.5rem;
}

.name input {
    background: transparent;
    border-bottom: 1px solid white;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    width: 400px;
    padding-bottom: 5px;
    color: white;
    font-family: "Mark-Thin";
}

input:focus {
    outline: none;
}

.name input:hover {
    cursor: text;
}

.name ::placeholder {
    color: white;
    font-family: "Mark-Thin";
}

.price .inputs {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.price .inputs input {
    background: transparent;
    border: 1px solid white;
    padding-right: 10px;
    color: white;
    padding-left: 5px;
}

.price ::placeholder {
    color: white;
    font-family: "Mark-Thin";
}

.name,
.price {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.searchButton {
    background-color: white;
    border: 0;
    height: 24px;
    width: 120px;
}

.searchButton:hover {
    cursor: pointer;
}

.products {
    padding: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
}

.product-card {
    width: calc(33.33% - 20px);
    cursor: pointer;
}

.else-products {
    font-size: 1.2rem;
    padding: 30px;
}

</style>
