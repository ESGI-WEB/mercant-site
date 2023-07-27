<template>
    <div class="card-container">
        <div v-for="order in orders" :key="order.id" class="card">
            <div class="total-price">
                {{ order.totalPrice }} {{ order.currency }}
            </div>
            <div class="user-info">
                <div class="name">{{ order.user.firstname }} {{ order.user.lastname }}</div>
                <div class="email">{{ order.user.email }}</div>
            </div>
            <div class="status">
                Statut : {{ order.status }}
            </div>
            <div class="date">
                Date : {{ new Date(order.createdAt).toLocaleDateString() }}
            </div>
        </div>
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
        orders.push(...newOrders)
        await findOrdersByCriteria({ _page: page + 1 })
    }
}
</script>

<style scoped>
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
}

.card {
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.total-price {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.user-info {
    margin-bottom: 10px;
}

.name {
    font-size: 16px;
    font-weight: bold;
}

.email {
    font-size: 14px;
    color: #555;
}

.status {
    font-size: 14px;
    color: #555;
}

.date {
    font-size: 14px;
    color: #555;
}
</style>
