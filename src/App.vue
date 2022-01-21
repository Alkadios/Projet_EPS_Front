<template>
  <Header />
  <main>
    <router-view />
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/views/Header.vue';
import UtilisateurService from './services/UtilisateurService';

const router = useRouter();

const { isObjectEmpty } = ObjectUtils();

const { storeOrganismesUtilisateur, organismeConnecte, storeOrganismeConnecte, listeOrganismesUtilisateur } =
  UtilisateurService();

onMounted(async () => {
  await storeOrganismesUtilisateur(listeOrganismesUtilisateur.value);

  if (listeOrganismesUtilisateur.value.length > 1 && isObjectEmpty(organismeConnecte.value)) {
    router.push({ name: 'TableauDeBord' });
    return;
  } else if (listeOrganismesUtilisateur.value.length === 0) {
    router.push({ name: 'TableauDeBord' });
    return;
  } else if (listeOrganismesUtilisateur.value.length === 1) {
    await storeOrganismeConnecte(listeOrganismesUtilisateur.value[0]);
  } else if (listeOrganismesUtilisateur.value.length > 1 && !isObjectEmpty(organismeConnecte.value)) {
    const organismeConnecteActualise = listeOrganismesUtilisateur.value.find(
      (o) => o.id_organisme === organismeConnecte.value.id_organisme
    );

    if (!organismeConnecteActualise) {
      router.push({ name: 'TableauDeBord' });
      return;
    }

    await storeOrganismeConnecte(organismeConnecteActualise);
  }
});
</script>
