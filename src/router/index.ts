import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Header from '../components/Header.vue'
import Login from "../pages/Login.vue"
import Home from "../pages/Home.vue"
import Order from "../pages/Order.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    components: {
      default: Home,
      header: Header,
    },
  }, {
    path: "/order",
    name: "Order",
    components: {
      default: Order,
      header: Header,
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
