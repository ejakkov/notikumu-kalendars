import { createRouter, createWebHistory } from 'vue-router';

import EventListView from '@/views/EventListView.vue';
import LoginView from '@/views/LoginView.vue';
import FavoritesView from '@/views/FavoritesView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: EventListView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;