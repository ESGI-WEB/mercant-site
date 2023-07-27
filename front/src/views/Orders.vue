<template>
  <div v-for="order in orders">
    {{ order.currency }}
      {{ order.status}}
      {{ order }}
  </div>
</template>

<script setup>
import { findOrdersByCriteria } from '../services/order'
import { inject, onMounted, reactive } from 'vue'
import { userKey } from '../services/authKeys'

const user = inject(userKey)
const orders = reactive([])

onMounted(async () => {
  if (user.value != null && user.value.id) {
    await fetchOrders(1)
  }
})

async function fetchOrders(page) {
  const options = {
    _page: page
  }
  const newOrders = await findOrdersByCriteria(options)
  if (newOrders.length) {
    Object.assign(orders, [...orders, newOrders])
    await findOrdersByCriteria({ _page: page + 1 })
  }
}
</script>

<style></style>
