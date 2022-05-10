<template>
  <div class="bg-gray-100" :class="{ 'g-sidenav-show': sidenavActive }">
    <div class="min-height-300 bg-primary position-absolute w-100"></div>
    <Sidebar :sidenavActive="sidenavActive" :displaySideBar="displaySidebar2" @hideRequest="sidenavActive = false" />
    <main class="main-content position-relative border-radius-lg">
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <Navbar :displaySidebar="displaySidebar2" />
          <router-view v-if="onMountedIsFinish" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from './views/Sidebar.vue';
import Navbar from './views/Navbar.vue';
//import UtilisateurService from './services/UtilisateurService';
import Authentification from './views/Authentification.vue';
//import Head from './views/_Head.vue';
import UtilisateurService from './services/UtilisateurService';
import ObjectUtils from './utils/ObjectUtils';

import router from './router';

// const router = useRouter();

const sidenavActive = ref(false);

const { isObjectEmpty } = ObjectUtils();
const { utilisateur, fetchAnneeEnCours, anneeEnCours, storeAnneeEnConfig, fetchEtablissementById } =
  UtilisateurService();
// const { storeOrganismesUtilisateur, organismeConnecte, storeOrganismeConnecte, listeOrganismesUtilisateur } =
//   UtilisateurService();

const onMountedIsFinish = ref(false);
const displaySidebar2 = ref('block');
onMounted(async () => {
  // if (isObjectEmpty(utilisateur.value)) {
  //   router.push({ name: 'Authentification' });
  // }

  await fetchAnneeEnCours();
  storeAnneeEnConfig(anneeEnCours.value);
  await fetchEtablissementById(1);

  onMountedIsFinish.value = true;
});

var win = navigator.platform.indexOf('Win') > -1;
if (win && document.querySelector('#sidenav-scrollbar')) {
  var options = {
    damping: '0.5',
  };
  Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
}
</script>
