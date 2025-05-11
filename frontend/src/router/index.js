import { createRouter, createWebHistory } from 'vue-router';

import EventListView from '@/views/EventListView.vue';
import EventDetailView from '@/views/EventDetailView.vue';
import LoginView from '@/views/LoginView.vue';
import FavoritesView from '@/views/FavoritesView.vue';
import RegisterView from '@/views/RegisterView.vue';

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
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetailView,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;