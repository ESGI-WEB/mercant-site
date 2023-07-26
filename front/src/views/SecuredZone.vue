<script setup>
import {inject, onMounted, provide, reactive} from 'vue'
import { logoutKey, userKey } from '../services/authKeys'
import {RouterLink, RouterView, useRoute} from 'vue-router'
import {
    findOrCreateOrder,
    findProductsByOrderId
} from '../services/order'
import store from '../store/store'
import {findProductById} from "../services/product";
import router from "../router";

const user = inject(userKey)
const logout = inject(logoutKey)
let order = reactive({})

onMounted(async () => {
  if (user.value != null && user.value.id != null && order != null) {
    const fetchedOrder = await findOrCreateOrder();
    Object.assign(order, fetchedOrder);
    const products = await findProductsByOrderId(order.id)
    store.numberOfProductsInCart = products.reduce(
        (accumulator, product) => accumulator + product.quantity,
        0
    )
    if (order.status === 'Processing') {
      await router.push({
        name: 'Cart',
        params: {
          id: order.id
        }
      })
    }
  }
})

provide('order', order)
</script>

<template>
  <nav>
    <div class="order">
      <RouterLink to="/">Purchase</RouterLink>
      <RouterLink to="/location">Renting</RouterLink>
      <RouterLink to="/cart">Orders</RouterLink>
    </div>
    <div class="logo">YachtMasters</div>
    <div class="account">
      <template v-if="user && user.role === 'Administrator'">
        <RouterLink to="/products">Products</RouterLink>
        <RouterLink to="/user">Users</RouterLink>
      </template>
        <RouterLink v-if="user && order" :to="'/cart/' + order.id">
        <div class="quantity">{{ store.numberOfProductsInCart }}</div>
        <div class="basket-icon">
          <span class="material-symbols-outlined">shopping_basket</span>
        </div>
      </RouterLink>
      <RouterLink to="/account"><span class="material-symbols-outlined">person</span></RouterLink>
      <a @click="logout"><span class="material-symbols-outlined">logout</span></a>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>
nav {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px 0 30px;

  > a,
  div {
    font-family: Arial;
    font-size: 1.8rem;
    flex: 1;
  }

  .logo {
    text-align: center;
    color: #18c0d6;
  }
}

.account {
  display: flex;
  gap: 40px;
  justify-content: flex-end;
  align-items: center;

  > a {
    color: inherit;
    font-family: Mark-Light;
    text-decoration: inherit;
  }
}

.order {
  display: flex;
  justify-content: flex-start;
  gap: 40px;
  align-items: center;

  > a {
    color: inherit;
    font-family: Mark-Light;
    text-decoration: inherit;
  }
}

a {
  cursor: pointer;
}

.quantity {
  position: absolute;
  font-size: 1rem !important;
  transform: translate(18px, -5px);
  background-color: #18c0d6;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.basket-icon {
  position: relative;
}
</style>
