// import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home/Home.vue';
// import Catalog from '../views/Catalog/Catalog.vue';
// import Product from '../views/Product/Product.vue';
// import Cart from '../views/Cart/Cart.vue';
// import Profile from '../views/Profile/Profile.vue';
// import Product_admin from '../views/Admin/Catalog/Product.vue';

// const routes = [
//   { path: '/', name: 'Home', component: Home },
//   { path: '/catalog', name: 'Catalog', component: Catalog },
//   { path: '/product/:id', name: 'Product', component: Product },
//   { path: '/cart', name: 'Cart', component: Cart },
//   { path: '/profile', name: 'Profile', component: Profile },
//   { path: '/admin/catalog/:id', name: 'Edit product', component: Product_admin }
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });

// export default router;

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