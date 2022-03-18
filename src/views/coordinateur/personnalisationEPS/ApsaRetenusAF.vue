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
              <h4 class="text-dark mb-4">{{ etablissement.nomEtablissement }}</h4>
            </div>
            <p>Sélectionner les AF retenus :</p>
            <font-awesome-icon icon="fa-regular fa-circle-plus" />
          </div>
        </div>
        <div class="mb-3">
          <SelectButton
            v-model="selectedAfs"
            :options="champsApprentissages"
            :optionLabel="(ca: ChampApprentissage) => 'CA'+ca.id"
          >
          </SelectButton>
        </div>
        <div class="mb-3">
          <div v-for="af of afs" :key="af.id" class="field-checkbox">
            <Checkbox :id="af.id" name="category" :value="af" style="margin-bottom: 0.5rem" v-model="selectedAfs" />
            <label style="margin: 0.5rem" :for="af.id.toString()">{{ af.libelle }}</label>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <Button label="Valider" style="right: 1rem" icon="pi pi-check" @click="verif()" autofocus />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { AF, ChampApprentissage } from '@/models';
import AfService from '@/services/AfService';
import ChampApprentissageService from '@/services/ChampApprentissageService';
import UtilisateurService from '@/services/UtilisateurService';

const { afs, fetchAllAfs } = AfService();
const { champsApprentissages, fetchChampsApprentissages } = ChampApprentissageService();
const { etablissement } = UtilisateurService();

const selectedAfs = ref([]);

onMounted(async () => {
  await fetchChampsApprentissages();
  await fetchAllAfs();
  console.log('onMounted', etablissement.value);
});

function verif() {
  console.log('selectedCategories.value');
}
</script>
