<template>
  <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
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
                <router-link to="/GestionAPSA" class="dropdown-item">Gestion des APSAS</router-link>
                <router-link to="/ApsaRetenusAF" class="dropdown-item">AF des APSA Retenus</router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/ajoutQuantiteTravailEleve"
            ><i class="fas fa-table"></i><span>Ajout Quantite Travail </span></router-link
          >
        </li>
      </ul>
      <div class="text-center d-none d-md-inline">
        <button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const displayMenu = ref(window.innerWidth >= 600);

onMounted(function () {
  // Evènement utilisé pour contrôler basculer le menu en mode ouvert ou fermé lors du passage de mobile à PC
  window.addEventListener('resize', () => {
    displayMenu.value = window.innerWidth >= 600;
  });
});
</script>
