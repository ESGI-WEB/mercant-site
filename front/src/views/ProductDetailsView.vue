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
            <button type="button" @click="addToCart('remove')">-</button>
          </div>
          <div class="input-quantity">
              {{ quantity }}
          </div>
          <div class="add-button">
            <button type="button" @click="addToCart('add')">+</button>
          </div>
        </div>
      </div>
      <div class="price-product">{{ product.price }} EUR</div>
    </div>
  </div>
</template>

<script setup>
import {inject, ref, onMounted, reactive, watch} from 'vue'
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
let product = reactive({})
const quantity = ref(0)
const order = inject('order')
watch(order, async (newValue, oldValue) => {
  if (newValue.id) {
    const products = await getOrderProducts(order.id)
    const product = products.find((p) => p.id === parseInt(productId.value))
    if(product) {
      quantity.value = product.quantity
    }
  }
});

onMounted(async () => {
  const route = useRoute()
  if (route && route.params && route.params.id && order) {
    productId.value = route.params.id
    const fetchedProduct = await findProductById(productId.value);
    Object.assign(product, fetchedProduct);
  }
})

async function addToCart(action) {

    if (!['add', 'remove'].includes(action)) {
        throw new Error('Invalid action. Action must be either "add" or "remove".');
    }

    const productQuantityChange = action === 'add' ? 1 : -1;
    const isRemovingProduct = productQuantityChange === -1;

    if (!order || !order.id || !productId.value) {
        return;
    }

    const products = await findProductsByOrderId(order.id);
    const isProductFound = products.some((product) => product.id === parseInt(productId.value));

    if (isProductFound) {
        const newQuantity = quantity.value + productQuantityChange;

        if (newQuantity === 0) {
            await removeOrderProduct(order.id, productId.value);
        } else {
            await editQuantityOrderProduct(order.id, productId.value, { quantity: newQuantity });
        }
        store.numberOfProductsInCart += productQuantityChange;
        quantity.value += productQuantityChange;
    } else if (!isRemovingProduct) {
        quantity.value += 1;
        const productData = {
            ProductId: productId.value,
            quantity: quantity.value,
        };
        await addProductToCart(order.id, productData);
        store.numberOfProductsInCart += 1;
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

.price-product {
  width: 20%;
  text-align: center;
  border: 1px solid black;
  border-radius: 20px;
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
  width: 40px;
  height: 28px;
  border-radius: 5px;
}

.add-button button:hover {
  cursor: pointer;
}

input:focus {
  outline: none;
}

.input-quantity {
  color: black;
  width: 50px;
  text-align: center;
}
</style>
