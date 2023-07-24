<template>
  <div class="product-details">
    <div class="yacht-image">
      <img :src="product.image" />
    </div>
    <div class="presentation">
      <div class="description">
        <div class="title">{{ product.title }}</div>
        <div>{{ product.description }}</div>
        <form @submit.prevent="addToCart">
          <div class="basket">
            <div>
              <input
                v-model="quantity"
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Add to cart"
              />
            </div>
            <div class="add-button">
              <button type="button" class="searchButton" @click="addToCart">Add</button>
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
import { addProductToCart } from '../services/order'

const productId = ref(null)
const product = ref({})
const quantity = ref(1)
const orders = inject('orders')

onMounted(async () => {
  const route = useRoute()
  if (route && route.params && route.params.id) {
    productId.value = route.params.id
    product.value = await findProductById(productId.value)
  }
})

async function addToCart() {
  const productData = {
    ProductId: product.value.id,
    quantity: quantity.value
  }
  await addProductToCart(orders.value[0].id, productData)
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
