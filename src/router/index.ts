import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
//import store from '@/store';
import ObjectUtils from '@/utils/ObjectUtils';

const { isObjectEmpty } = ObjectUtils();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'TableauDeBord',
    component: () => import('../views/tableau-bord/TableauDeBord.vue'),
  },
  {
    path: '/auth',
    name: 'Authentification',
    component: () => import('../views/Authentification.vue'),
  },
  {
    path: '/:notFound(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
