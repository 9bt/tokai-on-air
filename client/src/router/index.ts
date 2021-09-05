import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Latest from '@/views/Latest.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/latest',
    name: 'latest',
    component: Latest,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
