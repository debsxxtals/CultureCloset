import LandingPage from '../views/LandingPage.vue'
import HomePage from '@/views/HomePage.vue'

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: 'LandingPage',
    component: LandingPage,
    path: "/",
  },
  {
    name: 'HomePage',
    component: HomePage,
    path: "/home",
  },

];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Use HTML5 history mode
  routes, // Set the defined routes
});

export default router; // Export the router instance