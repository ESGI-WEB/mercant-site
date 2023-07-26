import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import ProductDetailsCard from "../views/ProductDetailsView.vue";
import Cart from "../components/Cart.vue";
import OrderConfirmed from "../views/OrderConfirmed.vue";
import OrderCancelled from "../views/OrderCancelled.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products/:id',
      name: 'ProductDetailsCard',
      component: ProductDetailsCard,
    },
    {
      path: '/cart/:id',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/order/confirmed',
      name: 'OrderConfirmed',
      component: OrderConfirmed
    },
    {
      path: '/order/cancelled',
      name: 'OrderCancelled',
      component: OrderCancelled
    }
  ]
})

export default router
