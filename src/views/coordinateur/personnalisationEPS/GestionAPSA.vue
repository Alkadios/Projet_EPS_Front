<template>
  <div class="card shadow-lg o-hidden border-0 my-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2" @click="toto">
                Personnalisation de l'équipe EPS <br />
                au
              </p>
              <h4 class="text-dark mb-4">{{ NomEtablissement }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <button class="btn btn-primary btn-sm">Ajouter une APSA</button>
      </div>
      <div id="mesCA">
        <div class="row">
          <div class="d-flex p-2" style="align-items: center;" v-for="monCA in CA" :key="monCA.nom">
            <div class="mr-2" style="padding: 9px;">
              {{ monCA.nom }}
            </div>
            <div class="mr-2 flex-grow-1 ">
              <SelectButton v-model="result" :options="monCA.APSA" optionLabel="nom" multiple />
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ChampApprentissageService from '@/services/ChampApprentissageService';

const { champsApprentissages, fetchChampsApprentissages } = ChampApprentissageService();
const paymentOptions = ref([
  { name: 'Option 1', value: 1 },
  { name: 'Option 2', value: 2 },
  { name: 'Option 3', value: 3 },
]);
const result = ref();
const NomEtablissement = 'Lycée Professionnel de St Joseph';
const CA = [
  { nom: 'CA1', APSA: [{ nom: 'Demi-fond' }, { nom: 'Saut en hauteur' }], couleur: 'red' },
  { nom: 'CA2', APSA: [{ nom: 'Natation' }, { nom: 'Step' }], couleur: 'orange' },
  { nom: 'CA1', APSA: [{ nom: 'Demi-fond' }, { nom: 'Saut en hauteur' }], couleur: 'red' },
  { nom: 'CA1', APSA: [{ nom: 'Demi-fond' }, { nom: 'Saut en hauteur' }], couleur: 'red' },
  { nom: 'CA1', APSA: [{ nom: 'Demi-fond' }, { nom: 'Saut en hauteur' }], couleur: 'red' },
];
const ListSelectedAPSA: string[] = [];

async function toto() {
  await fetchChampsApprentissages();
  console.log('maVariable', champsApprentissages.value);
}
</script>

<style>
.mr-2 {
  padding-left: 30px;
}

.p-button.p-component {
  margin: 1%;
  border: 1px solid black !important;
  border-radius: 8px !important;
}

th {
  color: white;
  padding-left: 5px;
  height: 30px;
}

#mesCA {
  margin-left: 25px;
  margin-right: 25px;
  bottom: 35px;
  position: relative;
}

.mb-3 {
  margin-left: 25px;
  margin-right: 25px;
  bottom: 35px;
  position: relative;
}
</style>
