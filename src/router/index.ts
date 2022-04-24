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
    path: '/ApsaRetenuAF',
    name: 'ApsaRetenuAF',
    component: () => import('../views/coordinateur/personnalisationEPS/ApsaRetenuAF.vue'),
  },
  {
    path: '/DeclinerAFRetenus',
    name: 'DeclinerAFRetenus',
    component: () => import('../views/coordinateur/personnalisationEPS/DeclinerAFRetenu.vue'),
  },
  {
    path: '/EvaluationEleves',
    name: 'EvaluationEleves',
    component: () => import('../views/professeur/evaluation/EvaluationEleves.vue'),
  },
  {
    path: '/Critere',
    name: 'Critere',
    component: () => import('../views/coordinateur/personnalisationEPS/Critere.vue'),
  },
  {
    path: '/IndicateurAF',
    name: 'IndicateurAF',
    component: () => import('../views/coordinateur/personnalisationEPS/IndicateurAF.vue'),
  },
  {
    path: '/Profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue'),
  },
  {
    path: '/CreerEleve',
    name: 'CreerEleve',
    component: () => import('../views/coordinateur/personnalisationEPS/CreerEleve.vue'),
  },
  {
    path: '/GestionClasse',
    name: 'CreerEleve',
    component: () => import('../views/coordinateur/GestionClasse.vue'),
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
