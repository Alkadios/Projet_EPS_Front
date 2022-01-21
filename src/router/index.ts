import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
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
    component: () => import('../views/authentification/Authentification.vue'),
  },
  {
    path: '/recherche',
    name: 'Search',
    component: () => import('../views/recherche/Recherche.vue'),
  },
  {
    path: '/dossier/:id',
    name: 'ConsultationDossier',
    component: () => import('@/views/consultation/dossier/ConsultationDossier.vue'),
  },
  {
    path: '/incident/:id',
    name: 'ConsultationIncident',
    component: () => import('@/views/consultation/ConsultationIncident.vue'),
  },
  {
    path: '/action/:id',
    name: 'ConsultationAction',
    component: () => import('@/views/consultation/ConsultationAction.vue'),
  },
  {
    path: '/creationDossier',
    name: 'CreationDossier',
    component: () => import('@/views/creation/dossier/CreationDossier.vue'),
  },
  {
    path: '/creationIncident',
    name: 'CreationIncident',
    component: () => import('../views/creation/CreationIncident.vue'),
  },
  {
    path: '/creationAction',
    name: 'CreationAction',
    component: () => import('../views/creation/CreationAction.vue'),
  },
  {
    path: '/parametrageDomaines',
    name: 'ParametrageDomaines',
    component: () => import('../views/parametrage/domaines/ParametrageDomaines.vue'),
  },
  {
    path: '/parametrageDomaines/saisieDomaine/:id?',
    name: 'SaisieDomaine',
    component: () => import('../views/parametrage/domaines/saisie-domaine/SaisieDomaine.vue'),
  },
  {
    path: '/parametrageContrats',
    name: 'ParametrageContrats',
    component: () => import('../views/parametrage/ParametrageContrats.vue'),
  },
  {
    path: '/parametrageTechniciens',
    name: 'ParametrageTechniciens',
    component: () => import('../views/parametrage/ParametrageTechniciens.vue'),
  },
  {
    path: '/parametrageClientsContacts',
    name: 'ParametrageClientsContacts',
    component: () => import('../views/parametrage/clients_contacts/ParametrageClientsContacts.vue'),
  },
  {
    path: '/parametrageClientsContacts/consultationModifClient/:id?',
    name: 'ConsultationModifClient',
    component: () => import('../views/parametrage/clients_contacts/ConsultationModifClient.vue'),
  },
  {
    path: '/parametrageGestionDroits',
    name: 'ParametrageGestionDroits',
    component: () => import('../views/parametrage/ParametrageGestionDroits.vue'),
  },
  {
    path: '/parametrageStatuts',
    name: 'ParametrageStatuts',
    component: () => import('../views/parametrage/statuts/ParametrageStatuts.vue'),
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

router.beforeEach((to, from, next) => {
  const organismeConnecte = store.getters['UtilisateurModule/getOrganismeConnecte'];
  if (to.name !== 'TableauDeBord' && isObjectEmpty(organismeConnecte)) {
    next({ name: 'TableauDeBord' });
  } else next();
});

export default router;
