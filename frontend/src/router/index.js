import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import CreateAccount from '../components/CreateAccount.vue';
import Home from '../components/Home.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/create',
    name: 'CreateAccount',
    component: CreateAccount,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;