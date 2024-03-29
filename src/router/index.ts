import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
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
    path: '/professeur/Accueil',
    name: 'professeur/Accueil',
    component: () => import('../views/professeur/Accueil.vue'),
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
    path: '/Accueil',
    name: 'AccueilEleve',
    component: () => import('../views/eleve/Accueil.vue'),
  },
  {
    path: '/Profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue'),
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
    path: '/GestionCoordonateur',
    name: 'GestionCoordonateur',
    component: () => import('../views/coordinateur/GestionCoordonateur.vue'),
  },
  {
    path: '/GestionProfEtablissement',
    name: 'GestionProfEtablissement',
    component: () => import('../views/coordinateur/GestionProfEtablissement.vue'),
  },
  {
    path: '/GestionEtablissement',
    name: 'GestionEtablissement',
    component: () => import('../views/coordinateur/GestionEtablissement.vue'),
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
