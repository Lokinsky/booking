import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeAdmin from '../views/HomeAdmin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeAdmin',
    component: HomeAdmin
  },
]

const router = new VueRouter({
  routes
})

export default router
