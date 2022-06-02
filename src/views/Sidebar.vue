<template>
  <aside
    class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4"
    id="sidenav-main"
    :style="'display:' + displaySideBar"
  >
    <div class="sidenav-header">
      <i
        class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
        @click="displayAside()"
      ></i>
      <a class="navbar-brand m-0" target="_blank" style="text-align: center">
        <img src="@/assets/img/logo-ocpeps.png" class="navbar-brand-img h-100" alt="main_logo" />
        <span class="ms-1 font-weight-bold">O.C.P.E.P.S</span>
      </a>
    </div>
    <hr class="horizontal dark mt-0" />
    <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <div v-if="user.roles.includes(Role.ADMIN)">
          <li class="nav-item mt-3">
            <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Coordonnateur</h6>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'TableauDeBordConfig' }" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
              </div>
              <i class="fas fa-table"></i>
              <span class="nav-link-text">Tableau de configuration</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GestionAPSA" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-info text-sm opacity-10"></i>
              </div>
              <i class="fas fa-running"></i>
              <span class="nav-link-text justify-content-center">Commencer la configuration</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/CrudEleve" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-info text-sm opacity-10"></i>
              </div>
              <i class="fas fa-graduation-cap"></i>
              <span class="nav-link-text justify-content-center">Gestion des élèves</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GestionClasse" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-info text-sm opacity-10"></i>
              </div>
              <i class="fas fa-users"></i>
              <span class="nav-link-text justify-content-center">Gestion des classes</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GestionProfesseur" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-info text-sm opacity-10"></i>
              </div>
              <i class="fas fa-user-tie"></i>
              <span class="nav-link-text justify-content-center">Gestion des professeurs</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GestionCoordonateur" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-info text-sm opacity-10"></i>
              </div>
              <i class="fas fa-walking"></i>
              <span class="nav-link-text justify-content-center">Gestion des coordonnateurs</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GestionEtablissement" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-info text-sm opacity-10"></i>
              </div>
              <i class="fas fa-school"></i>
              <span class="nav-link-text justify-content-center">Gestion des établissements</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GestionProfEtablissement" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-info text-sm opacity-10"></i>
              </div>
              <i class="fas fa-city"></i>
              <span class="nav-link-text justify-content-center">Attribution Etablissements</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GestionEleve" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-info text-sm opacity-10"></i>
              </div>
              <i class="fas fa-users"></i>
              <span class="nav-link-text justify-content-center">Attribution des classes</span>
            </router-link>
          </li>
        </div>
        <div v-if="user.roles.includes(Role.PROF)">
          <li class="nav-item mt-3">
            <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Professeur</h6>
          </li>
          <li class="nav-item">
            <router-link to="/EvaluationEleves" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
              </div>
              <i class="fas fa-stopwatch"></i>
              <span class="nav-link-text justify-content-center">Commencer une évaluation</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/AffichageEvaluationEleve" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-info text-sm opacity-10"></i>
              </div>
              <i class="fas fa-eye"></i>
              <span class="nav-link-text justify-content-center">Voir les évaluations</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GestionProfClasse" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-info text-sm opacity-10"></i>
              </div>
              <i class="fas fa-graduation-cap"></i>
              <span class="nav-link-text justify-content-center">Gestion de mes classes</span>
            </router-link>
          </li>
        </div>
        <div v-if="user.roles.includes(Role.ELEVE)">
          <li class="nav-item mt-3">
            <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Eleve</h6>
          </li>
          <li class="nav-item">
            <router-link to="/Accueil" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
              </div>
              <i class="fas fa-home"></i>
              <span class="nav-link-text justify-content-center">Accueil</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/AffichageMesEvaluation" style="margin: unset" class="nav-link">
              <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-info text-sm opacity-10"></i>
              </div>
              <i class="fas fa-eye"></i>
              <span class="nav-link-text justify-content-center">Voir mes évaluations</span>
            </router-link>
          </li>
        </div>
        <li class="nav-item mt-3" id="monCompteSideBar" style="display: none">
          <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Mon compte</h6>
        </li>
        <li class="nav-item" id="monProfilSideBar" style="display: none">
          <router-link to="/Profil" class="nav-link">
            <div
              class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
            </div>
            <i class="fas fa-user"></i>
            <span class="nav-link-text ms-1">Profile</span>
          </router-link>
        </li>
        <li class="nav-item" id="LogoutSideBar" style="display: none">
          <a @click="logout()" class="nav-link" href="#">
            <div
              class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="ni ni-single-copy-04 text-warning text-sm opacity-10"></i>
            </div>
            <i class="fas fa-sign-out-alt"></i>
            <span class="nav-link-text ms-1">Déconnexion</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script lang="ts" setup>
import UserService from '@/services/UserService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Role from '@/constants/Role';

const router = useRouter();
const displayMenu = ref(window.innerWidth >= 600);
const { token, user, deconnexion } = UserService();

onMounted(function () {
  // Evènement utilisé pour contrôler basculer le menu en mode ouvert ou fermé lors du passage de mobile à PC
  window.addEventListener('resize', () => {
    displayMenu.value = window.innerWidth >= 600;
  });
});

const props = defineProps({
  displaySideBar: {
    type: String,
    required: true,
  },
  sidenavActive: Boolean,
});

async function logout() {
  await deconnexion();
}

function displayAside() {
  let asideBar = document.getElementById('sidenav-main');
  if (asideBar?.style.display === 'none') {
    asideBar.style.display = 'block';
  } else {
    asideBar!.style.display = 'none';
  }
}
</script>
