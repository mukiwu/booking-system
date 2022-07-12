import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "../pages/Home.vue"
import Order from "../pages/Order.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  }, {
    path: "/order",
    name: "Order",
    component: Order,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
