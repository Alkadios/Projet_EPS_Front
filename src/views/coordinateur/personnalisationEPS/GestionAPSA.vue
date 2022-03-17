<template>
  <Dialog v-model:visible="displayModal" :header="monCAModal.libelle" :style="{ width: '50vw' }" :modal="true">
    <MultiSelect
      v-model="apsaFromCaSelectionnes"
      :options="apsas"
      dataKey="id"
      optionLabel="libelle"
      placeholder="Selectionner APSA"
      :filter="true"
      display="chip"
    />
    <template #footer>
      <Button label="Annuler" icon="pi pi-times" @click="closeModal()" class="p-button-text" />
      <Button label="Valider" icon="pi pi-check" @click="AjoutApsaInCa()" autofocus />
    </template>
  </Dialog>
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
              <h4 class="text-dark mb-4">{{ NomEtablissement }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div id="mesCA">
        <div class="row">
          <div
            v-for="monCA in champsApprentissages"
            :key="monCA.id"
            :style="'background-color:' + monCA.color"
            class="d-flex p-2"
          >
            <div class="mr-2" style="padding: 9px">
              <button class="ButtonHead" @click="openModal(monCA)">
                <p class="MonHead">
                  CA{{ monCA.id }}
                  <Button icon="pi pi-external-link"><i class="fa fa-plus"></i></Button>
                </p>
              </button>
            </div>
            <div class="mr-2 flex-grow-1">
              <SelectButton
                v-model="apsasSelectionnes"
                :options="getApsasFromCa(monCA)"
                optionLabel="libelle"
                multiple
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <Button
        label="Ajouter les APSA sélectionnés"
        style="right: 1rem"
        icon="pi pi-check"
        @click="verif(), $router.push('ApsaRetenusAF')"
        autofocus
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ChampApprentissageService from '@/services/ChampApprentissageService';
import ApsaService from '@/services/ApsaService';
import { APSA, ChampApprentissage, ChampsApprentissageApsa } from '@/models';
import { RouterLink } from 'vue-router';

const { champsApprentissages, fetchChampsApprentissages } = ChampApprentissageService();
const { apsas, fetchAllApsa } = ApsaService();

const NomEtablissement = 'Lycée Professionnel de St Joseph';
const displayModal = ref(false);
const monCAModal = ref<ChampApprentissage>({ id: -1, libelle: '', color: '', champsApprentissageApsas: [] });
const apsasSelectionnes = ref([]);
const apsaFromCaSelectionnes = ref<APSA[]>([]);

function getApsasFromCa(CA: ChampApprentissage) {
  const maListeAPSA = ref<APSA[]>([]);
  CA.champsApprentissageApsas.forEach((monCaApsas: ChampsApprentissageApsa) => maListeAPSA.value.push(monCaApsas.Apsa));
  return maListeAPSA.value;
}

function openModal(CA: ChampApprentissage) {
  monCAModal.value = CA;
  CA.champsApprentissageApsas.forEach((monCaApsas: ChampsApprentissageApsa) =>
    apsaFromCaSelectionnes.value.push(monCaApsas.Apsa)
  );
  displayModal.value = true;
}

function closeModal() {
  displayModal.value = false;
  apsaFromCaSelectionnes.value = [];
}

function AjoutApsaInCa() {
  closeModal();
}

function verif() {
  console.log(champsApprentissages.value);
}

onMounted(async () => {
  await fetchChampsApprentissages();
  await fetchAllApsa();
});
</script>
