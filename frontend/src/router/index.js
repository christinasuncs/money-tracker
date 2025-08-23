import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import CreateAccount from '../components/CreateAccount.vue';

const routes = [
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