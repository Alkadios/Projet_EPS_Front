<template>
  <Dialog v-model:visible="displayModal" :header="monCAModal.libelle" :style="{ width: '50vw' }" :modal="true">
    <MultiSelect
      v-model="selectedAPSA"
      :options="apsas"
      dataKey="id"
      optionLabel="libelle"
      placeholder="Selectionner APSA"
      :filter="true"
      display="chip"
    />
    <template #footer>
      <Button label="Annuler" icon="pi pi-times" @click="closeModal()" class="p-button-text" />
      <Button label="Valider" icon="pi pi-check" @click="validerAjout()" autofocus />
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
          <div v-for="monCA in champsApprentissages" :key="monCA.id" class="d-flex p-2">
            <div class="mr-2" style="padding: 9px">
              <p class="MonHeadButton">
                CA{{ monCA.id }}
                <Button icon="pi pi-external-link" @click="openModal(monCA)"><i class="fa fa-plus"></i></Button>
              </p>
            </div>
            <div class="mr-2 flex-grow-1">
              <SelectButton v-model="result" :options="monCA.Apsa" optionLabel="libelle" multiple />
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
        @click="closeModal()"
        autofocus
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ChampApprentissageService from '@/services/ChampApprentissageService';
import ApsaService from '@/services/ApsaService';
import { APSA, ChampApprentissage } from '@/models';

const { champsApprentissages, fetchChampsApprentissages } = ChampApprentissageService();
const { apsas, fetchAllApsa } = ApsaService();

const result = ref([]);
const selectedAPSA = ref<APSA[]>([]);

const NomEtablissement = 'Lycée Professionnel de St Joseph';

const displayModal = ref(false);
const monCAModal = ref<ChampApprentissage>({ id: -1, libelle: '', Apsa: [] });

function closeModal() {
  displayModal.value = false;
  selectedAPSA.value = [];
}

function validerAjout() {}

function openModal(CA: ChampApprentissage) {
  monCAModal.value = CA;
  selectedAPSA.value = CA.Apsa;
  displayModal.value = true;
}

onMounted(async () => {
  await fetchChampsApprentissages();
  await fetchAllApsa();
});
</script>
