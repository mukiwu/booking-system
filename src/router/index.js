import { createRouter, createWebHistory } from "vue-router"
import Header from '../components/Header.vue'
import Login from "../pages/Login.vue"
import Home from "../pages/Home.vue"
import Order from "../pages/Order.vue"
import Calendar from "../pages/Calendar.vue"

const routes = [
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
  }, {
    path: "/calendar",
    name: "Calendar",
    components: {
      default: Calendar,
      header: Header,
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  if (user) {
    next()
  } else {
    if (to.path !== '/login') next('/login')
    else next()
  }
})

export default router
