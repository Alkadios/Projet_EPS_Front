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
      <div class="mb-3"><button class="btn btn-primary btn-sm">Ajouter une APSA</button></div>
      <div id="mesCA">
        <div class="row">
          <div class="col-sm" v-for="monCA in CA" :key="monCA.nom">
            <table style="width: 100%">
              <thead :style="'background-color: ' + monCA.couleur">
                <tr>
                  <th>{{ monCA.nom }}</th>
                  <th>
                    <a id="AjoutAPSAinCA" href="#"><i class="fa fa-plus"></i></a>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="SelectAPSA" v-for="monAPSA in monCA.APSA" :key="monAPSA.nom">
                  <td>
                    <a>{{ monAPSA.nom }}</a>
                  </td>
                  <td><input type="checkbox" @Click="SelectAPSA(monAPSA.nom)" class="form-check-input" /></td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        </div>
      </div>
      <SelectButton v-model="result" :options="paymentOptions" optionLabel="name" multiple />
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

function SelectAPSA(monAPSA: string) {
  if (!ListSelectedAPSA.find((apsa) => apsa == monAPSA)) {
    ListSelectedAPSA.push(monAPSA);
  } else {
    let monIndex = ListSelectedAPSA.indexOf(monAPSA);
    ListSelectedAPSA.splice(monIndex, 1);
  }
}

async function toto() {
  await fetchChampsApprentissages();
  console.log('maVariable', champsApprentissages.value);
}
</script>

<style>
#AjoutAPSAinCA {
  color: white;
  padding: 5px;
  right: 7px;
  position: relative;
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
