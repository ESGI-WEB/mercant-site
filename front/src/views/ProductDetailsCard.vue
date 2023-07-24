<template>
  <div class="product-details">
    <div class="yacht-image">
      <img :src="product.image" alt="Product Image" />
    </div>
    <div class="presentation">
      <div class="description">
        <div class="title">{{ product.title }}</div>
        <div>{{ product.description }}</div>
        <div class="basket">
          <div class="add-button">
            <button type="button" @click="addToCart('add')">+</button>
          </div>
          <div>
            <input
              class="input-quantity"
              v-model.number="quantity"
              type="number"
              id="quantity"
              name="quantity"
              disabled="disabled"
              placeholder="Add to cart"
            />
          </div>
          <div class="add-button">
            <button type="button" @click="addToCart('remove')">-</button>
          </div>
        </div>
      </div>
      <div class="price">{{ product.price }}</div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
    findProductsByOrderId,
    getOrderProducts,
    addProductToCart,
    editQuantityOrderProduct, removeOrderProduct
} from '../services/order'
import { findProductById } from '../services/product'
import store from '../store/store'

const productId = ref(null)
const product = ref({})
const quantity = ref(0)
const order = inject('order')

onMounted(async () => {
  const route = useRoute()
  if (route && route.params && route.params.id && order.value) {
    productId.value = route.params.id
    product.value = await findProductById(productId.value)
    if (order.value.id) {
      const products = await getOrderProducts(order.value.id)
      const product = products.find((p) => p.id === parseInt(productId.value))
      if(product) {
        quantity.value = product.quantity
      }
    }
  }
})

async function addToCart(action) {
    if (!['add', 'remove'].includes(action)) {
        throw new Error('Invalid action. Action must be either "add" or "remove".');
    }

    const productQuantityChange = action === 'add' ? 1 : -1;
    const isRemovingProduct = productQuantityChange === -1;

    if (!order.value || !order.value.id || !productId.value) {
        return;
    }

    const products = await findProductsByOrderId(order.value.id);
    const isProductFound = products.some((product) => product.id === parseInt(productId.value));

    if (isProductFound) {
        const newQuantity = quantity.value + productQuantityChange;

        if (newQuantity === 0) {
            await removeOrderProduct(order.value.id, productId.value);
        } else {
            await editQuantityOrderProduct(order.value.id, productId.value, { quantity: newQuantity });
        }
        store.numberOfProductsInCart += productQuantityChange;
        quantity.value += productQuantityChange;
    } else if (!isRemovingProduct) {
        const productData = {
            ProductId: productId.value,
            quantity: quantity.value,
        };

        await addProductToCart(order.value.id, productData);
        store.numberOfProductsInCart += 1;
        quantity.value += 1;
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
  padding-top: 20px;
  padding-bottom: 20px;
}

.add-button button {
  background-color: #18c0d6;
  border: 1px #18c0d6 solid;
  cursor: pointer;
  color: white;
  font-weight: bold;
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.add-button button:hover {
  cursor: pointer;
}

input:focus {
  outline: none;
}

.input-quantity {
  text-align: center;
  border: 0;
    width: 50px;
  color: black;
  background: transparent;
}
</style>
