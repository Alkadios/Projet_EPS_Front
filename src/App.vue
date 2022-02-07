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
// import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import Sidebar from './views/Sidebar.vue';
import Navbar from './views/Navbar.vue';
//import Head from './views/_Head.vue';
//import UtilisateurService from './services/UtilisateurService';

// const router = useRouter();

// const { isObjectEmpty } = ObjectUtils();

// const { storeOrganismesUtilisateur, organismeConnecte, storeOrganismeConnecte, listeOrganismesUtilisateur } =
//   UtilisateurService();

// onMounted(async () => {
//   await storeOrganismesUtilisateur(listeOrganismesUtilisateur.value);

//   if (listeOrganismesUtilisateur.value.length > 1 && isObjectEmpty(organismeConnecte.value)) {
//     router.push({ name: 'TableauDeBord' });
//     return;
//   } else if (listeOrganismesUtilisateur.value.length === 0) {
//     router.push({ name: 'TableauDeBord' });
//     return;
//   } else if (listeOrganismesUtilisateur.value.length === 1) {
//     await storeOrganismeConnecte(listeOrganismesUtilisateur.value[0]);
//   } else if (listeOrganismesUtilisateur.value.length > 1 && !isObjectEmpty(organismeConnecte.value)) {
//     const organismeConnecteActualise = listeOrganismesUtilisateur.value.find(
//       (o) => o.id_organisme === organismeConnecte.value.id_organisme
//     );

//     if (!organismeConnecteActualise) {
//       router.push({ name: 'TableauDeBord' });
//       return;
//     }

//     await storeOrganismeConnecte(organismeConnecteActualise);
//   }
//});
</script>
