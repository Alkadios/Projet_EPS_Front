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
      ></i>
      <a class="navbar-brand m-0" target="_blank" style="text-align: center">
        <img src="@/assets/img/logo-ocpeps.png" class="navbar-brand-img h-100" alt="main_logo" />
        <span class="ms-1 font-weight-bold">O.C.P.E.P.S</span>
      </a>
    </div>
    <hr class="horizontal dark mt-0" />
    <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
      <ul class="navbar-nav">
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
            <span class="nav-link-text justify-content-center">Gestion des sports</span>
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
          <router-link to="/GestionEleve" style="margin: unset" class="nav-link">
            <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
              <i class="ni ni-collection text-info text-sm opacity-10"></i>
            </div>
            <i class="fas fa-walking"></i>
            <span class="nav-link-text justify-content-center">Attribution des classes</span>
          </router-link>
        </li>
        <li class="nav-item mt-3">
          <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Professeur</h6>
        </li>
        <li class="nav-item">
          <router-link to="/EvaluationEleves" style="margin: unset" class="nav-link">
            <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
              <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
            </div>
            <i class="fas fa-stopwatch"></i>
            <span class="nav-link-text justify-content-center">Commencer l'évaluation</span>
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
          <a href="#" style="margin: unset" class="nav-link">
            <div class="icon icon-shape icon-sm d-flex align-items-center justify-content-center">
              <i class="ni ni-collection text-info text-sm opacity-10"></i>
            </div>
            <i class="fas fa-graduation-cap"></i>
            <span class="nav-link-text justify-content-center">Gestion de mes classes</span>
          </a>
        </li>
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
        <li class="nav-item mt-3" id="monCompteSideBar" style="display: none">
          <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Mon compte</h6>
        </li>
        <li class="nav-item" id="monProfilSideBar" style="display: none" @click="echo">
          <a class="nav-link" href="#">
            <div
              class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center"
            >
              <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
            </div>
            <i class="fas fa-user"></i>
            <span class="nav-link-text ms-1">Profile</span>
          </a>
        </li>
        <li class="nav-item" id="LogoutSideBar" style="display: none">
          <a class="nav-link" href="#">
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

  <!-- <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
    <div class="container-fluid d-flex flex-column p-0">
      <a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
        <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-running"></i></div>
        <div class="sidebar-brand-text mx-3"><span>OCPEPS</span></div>
      </a>
      <hr class="sidebar-divider my-0" />
      <ul class="navbar-nav text-light" id="accordionSidebar">
        <li class="nav-item">
          <a class="nav-link" href="#"><i class="fas fa-tachometer-alt"></i><span>Dashboard</span></a>
        </li>
        <li class="nav-item">
          <div class="btn-group dropend">
            <a class="nav-link" id="settings-nav-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fas fa-cog"></i><span>Paramétrage</span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <router-link :to="{ name: 'TableauDeBordConfig' }" class="dropdown-item">Tableau de bord</router-link>
                <router-link to="/GestionAPSA" class="dropdown-item">Gestion des APSAS</router-link>
                <router-link to="/ApsaRetenuAF" class="dropdown-item">AF des APSA Retenus</router-link>
                <router-link to="/DeclinerAFRetenus" class="dropdown-item">Decliner les AF Retenus</router-link>
                <router-link to="/Critere" class="dropdown-item">Critères</router-link>
                <router-link to="/IndicateurAF" class="dropdown-item">Indicateur AF</router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <div class="btn-group dropend">
            <a class="nav-link" id="settings-nav-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fas fa-cog"></i><span>Gestion des utilisateurs</span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-if="token == ''">
                <router-link to="#" class="dropdown-item">Connecteé-vous</router-link>
              </li>
              <li v-if="token != null">
                <router-link to="/CrudEleve" class="dropdown-item">Gestion des eleves</router-link>
                <router-link to="/GestionClasse" class="dropdown-item">Gestion des classes</router-link>
                <router-link to="/GestionEleve" class="dropdown-item">Attribution des classes</router-link>
                <router-link to="/GestionProfesseur" class="dropdown-item">Gestion des professeurs</router-link>
                <router-link to="/GestionProfClasse" class="dropdown-item">Mes classes</router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/AffichageEvaluationEleve"
            ><i class="fas fa-table"></i><span>Affichage Evaluation </span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/AffichageMesEvaluation"
            ><i class="fas fa-table"></i><span>Affichage Evaluation d'un Eleve </span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/Acceuil"
            ><i class="fas fa-table"></i><span>Accueil Eleve </span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/EvaluationEleves"
            ><i class="fas fa-table"></i><span>Evaluation</span></router-link
          >
        </li>
      </ul>
      <div class="text-center d-none d-md-inline">
        <button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
      </div>
    </div>
  </nav> -->
</template>
<script lang="ts" setup>
import UserService from '@/services/UserService';
import { onMounted, ref } from 'vue';
const displayMenu = ref(window.innerWidth >= 600);
const { token, user } = UserService();

onMounted(function () {
  // Evènement utilisé pour contrôler basculer le menu en mode ouvert ou fermé lors du passage de mobile à PC
  window.addEventListener('resize', () => {
    displayMenu.value = window.innerWidth >= 600;
  });
  console.log('test', token.value);
  console.log('user', user.value);
  console.log('user', user.value.professeurs);
  echo();
});

const props = defineProps({
  displaySideBar: {
    type: String,
    required: true,
  },
  sidenavActive: Boolean,
});

function echo() {
  console.log(props.displaySideBar, 'props', props.sidenavActive);
}
</script>
