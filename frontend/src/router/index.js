import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import CreateAccount from '../components/CreateAccount.vue';
import Home from '../components/Home.vue';
import Dashboard from '../components/Dashboard.vue'
const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/login',
    name: 'LoginView',
    component: Login,
  },
  {
    path: '/create',
    name: 'CreateAccountView',
    component: CreateAccount,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;