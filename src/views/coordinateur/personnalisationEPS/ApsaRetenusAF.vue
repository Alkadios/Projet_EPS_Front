<template>
  <div class="container">
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
        </div>
      </div>
    </div>
    <div class="mb-3 col-5">
      <p>Sélectionner les niveaux scolaire concernés :</p>
    </div>
    <div class="col-6">
      <SelectButton
        v-model="niveauxScolaireSelectionnes"
        :options="etablissement.niveauxScolaires"
        optionLabel="libelle"
      />
    </div>
    <div class="mb-3 col-5">
      Sélectionner les champs apprentissages concernés :
      <SelectButton
        v-model="selectedAfs"
        :options="champsApprentissages"
        :optionLabel="(ca: ChampApprentissage) => 'CA'+ca.id"
      >
      </SelectButton>
    </div>
    <div class="mb-3 col-5">
      <div v-for="af of afs" :key="af.id" class="field-checkbox">
        <Checkbox :id="af.id" name="category" :value="af" style="margin-bottom: 0.5rem" v-model="selectedAfs" />
        <label style="margin: 0.5rem" :for="af.id.toString()">{{ af.libelle }}</label>
      </div>
    </div>
    <div class="mb-3">
      <Button label="Valider" style="right: 1rem" icon="pi pi-check" @click="verif()" autofocus />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { AF, ChampApprentissage, NiveauScolaire } from '@/models';
import AfService from '@/services/AfService';
import ChampApprentissageService from '@/services/ChampApprentissageService';
import UtilisateurService from '@/services/UtilisateurService';

const { afs, fetchAllAfs } = AfService();
const { champsApprentissages, fetchChampsApprentissages } = ChampApprentissageService();
const { etablissement } = UtilisateurService();

const selectedAfs = ref([]);
const niveauxScolaireSelectionnes = ref<NiveauScolaire[]>([]);

onMounted(async () => {
  await fetchChampsApprentissages();
  await fetchAllAfs();
  console.log('onMounted', etablissement.value);
});

function verif() {
  console.log('selectedCategories.value');
}
</script>
