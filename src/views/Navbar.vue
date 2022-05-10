<template>
  <!-- <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
    <div class="container-fluid">
      <button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button">
        <i class="fas fa-bars"></i>
      </button>
      <form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div class="input-group">Configuration de l'année {{ anneeEnConfig.annee }}</div>
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
  </nav> -->
  <div class="card shadow-lg mx-4" style="top: 1rem">
    <div class="card-body p-3">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img src="@/assets/img/man.png" alt="profile_image" class="w-100 border-radius-lg shadow-sm" />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">DELEFORTRIE Lucas</h5>
            <p class="mb-0 font-weight-bold text-sm">Coordonnateur</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
          <div class="nav-wrapper position-relative end-0">
            <ul class="nav nav-pills nav-fill p-1" role="tablist">
              <li class="nav-item" id="buttonSideBar" style="margin: auto; display: none">
                <a
                  class="nav-link mb-0 px-0 py-1 active d-flex align-items-center justify-content-center"
                  data-bs-toggle="tab"
                  href="javascript:;"
                  role="tab"
                  aria-selected="true"
                  @click="reponsiveSideBar()"
                  style="margin: auto"
                >
                  <i
                    class="fa fa-align-justify"
                    aria-hidden="true"
                    style="font-size: 1.5rem; font-size: 1.5rem; right: 0; position: absolute; padding-right: 2rem"
                  ></i>
                </a>
              </li>
              <li class="nav-item" id="buttonProfil">
                <a
                  class="nav-link mb-0 px-0 py-1 active d-flex align-items-center justify-content-center"
                  data-bs-toggle="tab"
                  href="javascript:;"
                  role="tab"
                  aria-selected="true"
                >
                  <i class="ni ni-app"></i>
                  <span class="ms-2">Mon profil</span>
                </a>
              </li>
              <li class="nav-item" id="buttonLogout">
                <a
                  class="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center"
                  data-bs-toggle="tab"
                  href="javascript:;"
                  role="tab"
                  aria-selected="false"
                >
                  <i class="ni ni-settings-gear-65"></i>
                  <span class="ms-2">Déconnexion</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
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

const emit = defineEmits(['update:displaySidebar']);

const props = defineProps({
  displaySideBar: {
    type: String,
    required: false,
  },
});

onMounted(async () => {
  // Evènement utilisé pour contrôler basculer le menu en mode ouvert ou fermé lors du passage de mobile à PC
  window.addEventListener('resize', () => {
    displayMenu.value = window.innerWidth >= 600;
  });
  isLoading.value = true;

  isLoading.value = false;
});

function reponsiveSideBar() {
  console.log('ta ', props.displaySideBar);
  if (props.displaySideBar === 'none') {
    emit('update:displaySidebar', 'block');
    console.log('oui');
  } else {
    emit('update:displaySidebar', 'none');
    console.log('non');
  }
}

// function toggleMenu() {
//   displayMenu.value = !displayMenu.value;
// }

// async function changerOrganisme() {
//   await deconnecterOrganisme();
//   router.replace({ name: 'TableauDeBord', params: { updateSelectionOrganismeComponent: 1 } });
// }
</script>
