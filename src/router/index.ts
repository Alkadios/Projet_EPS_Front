import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
//import store from '@/store';
import ObjectUtils from '@/utils/ObjectUtils';

const { isObjectEmpty } = ObjectUtils();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/authentification/Authentification.vue'),
  },
  {
    path: '/auth',
    name: 'Authentification',
    component: () => import('../views/Authentification.vue'),
  },
  {
    path: '/GestionAPSA',
    name: 'GestionAPSA',
    component: () => import('../views/coordinateur/personnalisationEPS/GestionAPSA.vue'),
  },
  {
    path: '/ajoutQuantiteTravailEleve',
    name: 'AjoutQuantiteTravailEleve',
    component: () => import('../views/coordinateur/personnalisationEPS/AjoutQuantiteTravailEleve.vue'),
  },
  {
    path: '/ApsaRetenusAF',
    name: 'ApsaRetenusAF',
    component: () => import('../views/coordinateur/personnalisationEPS/ApsaRetenusAF.vue'),
  },
  {
    path: '/DeclinerAFRetenus',
    name: 'DeclinerAFRetenus',
    component: () => import('../views/coordinateur/personnalisationEPS/DeclinerAFRetenus.vue'),
  },
  {
    path: '/Profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue'),
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
