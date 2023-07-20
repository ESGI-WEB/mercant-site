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
</template>

<script setup>
import { reactive } from "vue";
import { getProducts } from '../services/product';

const formData = reactive({
    title: "",
    priceMin: "",
    priceMax: ""
});

async function search() {
    try {
        this.products = await getProducts();
    } catch (error) {
        console.error('Error on getting products :', error);
    }
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
</style>
