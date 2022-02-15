<template>
  <div id="wrapper">
    <Sidebar />
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <Navbar />
        <div class="container-fluid">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
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

const { isObjectEmpty } = ObjectUtils();
const { utilisateur } = UtilisateurService();
// const { storeOrganismesUtilisateur, organismeConnecte, storeOrganismeConnecte, listeOrganismesUtilisateur } =
//   UtilisateurService();

onMounted(async () => {
  // if (isObjectEmpty(utilisateur.value)) {
  //   router.push({ name: 'Authentification' });
  // }
});
</script>
