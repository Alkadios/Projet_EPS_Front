<template>
  <ErrorDialog v-model:afficherModal="afficherModalErreur" v-model:libelleErreur="libelleErreur" />
  <div class="flex justify-content-center">
    <form @submit.prevent="validerFormulaire">
      <div class="card">
        <h4 class="ml-2">Authentification</h4>
        <div class="p-fluid">
          <div class="p-field">
            <label for="identifiant">Identifiant</label>
            <InputText id="identifiant" type="text" v-model="identifiant" />
          </div>
          <div class="p-field">
            <label for="password">Mot de passe</label>
            <InputText id="password" type="password" v-model="motDePasse" />
          </div>
        </div>
        <div class="flex justify-content-end mt-3 mr-2">
          <Button
            id="confirmation-recherche"
            class="p-button-raised p-button-rounded"
            icon="pi pi-search"
            label="Rechercher"
            @click="validerFormulaire"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UtilisateurService from '@/services/UtilisateurService';

const router = useRouter();

const { fetchUtilisateur } = UtilisateurService();

const afficherModalErreur = ref(false);
const libelleErreur = ref('');
const identifiant = ref('');
const motDePasse = ref('');

async function validerFormulaire() {
  if (identifiant.value === '' || motDePasse.value === '') {
    libelleErreur.value = 'Identifiant ou mot de passe invalide';
    afficherModalErreur.value = true;
  }

  try {
    await fetchUtilisateur(identifiant.value);

    router.push({ name: 'TableauDeBord' });
  } catch (e: any) {
    if (e.response && e.response.status === 500) {
      afficherModalErreur.value = true;
    } else {
      libelleErreur.value = e.message;
      afficherModalErreur.value = true;
    }
  }
}
</script>
