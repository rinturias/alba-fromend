import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Paciente from '../components/Paciente.vue'
import Historial from '../components/HistorialClinico.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/pacientes',
    name: 'pacientes',
component:Paciente
  },
  {
  path:'/historial',
  name: 'historial',
  component:Historial
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
