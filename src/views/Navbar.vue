<template>
  <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
    <div class="container-fluid">
      <button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button">
        <i class="fas fa-bars"></i>
      </button>
      <form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div class="input-group">Année en configuration: {{ anneeEnConfig.annee }}</div>
      </form>
      <ul class="navbar-nav flex-nowrap ms-auto">
        <li class="nav-item dropdown d-sm-none no-arrow">
          <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"
            ><i class="fas fa-search"></i
          ></a>
          <div class="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
            <form class="me-auto navbar-search w-100">
              <div class="input-group">
                <input class="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                <div class="input-group-append">
                  <button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button>
                </div>
              </div>
            </form>
          </div>
        </li>
        <div class="d-none d-sm-block topbar-divider"></div>
        <li class="nav-item dropdown no-arrow">
          <div class="nav-item dropdown no-arrow">
            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"
              ><span class="d-none d-lg-inline me-2 text-gray-600 small">{{ utilisateur.prenom }}</span
              ><i class="fas fa-user"></i
            ></a>
            <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in">
              <router-link to="/Profil" class="dropdown-item"
                ><i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile</router-link
              ><a class="dropdown-item" href="#"
                ><i class="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings</a
              ><a class="dropdown-item" href="#"
                ><i class="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity log</a
              >
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="logoutUtilisateur"
                ><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</a
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Annee } from '@/models';
import UtilisateurService from '@/services/UtilisateurService';
import AnneeService from '@/services/AnneeService';
//import { useRouter } from 'vue-router';

const {
  utilisateur,
  logoutUtilisateur,
  etablissement,
  anneeEnConfig,
  storeAnneeEnConfig,
  fetchAnneeEnCours,
  anneeEnCours,
} = UtilisateurService();
const { annees, fetchAllAnnees, annee, fetchAnneeById } = AnneeService();
// Contrôle l'affichage du menu. Par défaut, est vrai si l'écran n'est pas un mobile, faux sinon.
const displayMenu = ref(window.innerWidth >= 600);

const isLoading = ref(false);

onMounted(async () => {
  // Evènement utilisé pour contrôler basculer le menu en mode ouvert ou fermé lors du passage de mobile à PC
  window.addEventListener('resize', () => {
    displayMenu.value = window.innerWidth >= 600;
  });
  isLoading.value = true;

  isLoading.value = false;
});

// function toggleMenu() {
//   displayMenu.value = !displayMenu.value;
// }

// async function changerOrganisme() {
//   await deconnecterOrganisme();
//   router.replace({ name: 'TableauDeBord', params: { updateSelectionOrganismeComponent: 1 } });
// }
</script>
