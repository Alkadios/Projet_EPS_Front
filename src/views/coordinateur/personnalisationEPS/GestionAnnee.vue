<template>
  <div class="card shadow-lg o-hidden border-0 my-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2">
                Personnalisation de l'équipe EPS <br />
                au
              </p>
              <h4 class="text-dark mb-4">{{ etablissement.nom }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div><Dropdown v-model="anneeEnCours" :options="annees" optionLabel="annee" /></div>
    <div>
      <ProgressSpinner
        v-if="isLoading"
        style="float: right; width: 50px; height: 50px"
        strokeWidth="8"
        animationDuration=".5s"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Annee } from '@/models';
import UtilisateurService from '@/services/UtilisateurService';
import AnneeService from '@/services/AnneeService';

const { etablissement, anneeEnConfig } = UtilisateurService();
const { annees, fetchAllAnnee } = AnneeService();

const isLoading = ref(false);

const anneeEnCours = ref<Annee>();

onMounted(async () => {
  isLoading.value = true;
  await fetchAllAnnee();
  isLoading.value = false;
});
</script>
