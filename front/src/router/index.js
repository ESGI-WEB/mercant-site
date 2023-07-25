import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import ProductDetailsCard from "../views/ProductDetailsCard.vue";
import Cart from "../components/Cart.vue";

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
  ]
})

export default router
