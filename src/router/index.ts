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
    path: '/coordinateur/TableauDeBord',
    name: 'TableauDeBordConfig',
    component: () => import('../views/coordinateur/personnalisationEPS/TableauDeBordConfig.vue'),
  },
  {
    path: '/AffichageEvaluationEleve',
    name: 'AffichageEvaluationEleve',
    component: () => import('../views/professeur/evaluation/AffichageEvaluationEleve.vue'),
  },
  {
    path: '/AffichageMesEvaluation',
    name: 'EvaluationEleve',
    component: () => import('../views/eleve/evaluation/AffichageEvaluationAPSA_Eleve.vue'),
  },
  {
    path: '/Acceuil',
    name: 'Acceuil',
    component: () => import('../views/eleve/Acceuil.vue'),
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
    name: 'GestionClasse',
    component: () => import('../views/coordinateur/GestionClasse.vue'),
  },
  {
    path: '/GestionEleve',
    name: 'GestionEleve',
    component: () => import('../views/coordinateur/GestionEleve.vue'),
  },
  {
    path: '/CrudEleve',
    name: 'CrudEleve',
    component: () => import('../views/coordinateur/CrudEleve.vue'),
  },
  {
    path: '/GestionProfesseur',
    name: 'GestionProfesseur',
    component: () => import('../views/coordinateur/GestionProfesseur.vue'),
  },
  {
    path: '/GestionProfClasse',
    name: 'GestionProfClasse',
    component: () => import('../views/professeur/GestionProfClasse.vue'),
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
