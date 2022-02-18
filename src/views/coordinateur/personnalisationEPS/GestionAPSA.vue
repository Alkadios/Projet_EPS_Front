<template>
  <Dialog v-model:visible="displayModal" :header="monCAModal.libelle" :style="{width: '50vw'}" :modal="true">
    <MultiSelect v-model="selectedAPSA" :options="apsas" optionLabel="libelle" placeholder="Selectionner APSA" filter="true" display="chip" />
    <template #option="slotProps">
      <div class="country-item">
        <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" class="mr-2" width="18" />
        <div>{{slotProps.option.name}}</div>
      </div>
    </template>
    <template #footer>
      <Button label="Annuler" icon="pi pi-times" @click="closeModal(selectedAPSA)" class="p-button-text"/>
      <Button label="Valider" icon="pi pi-check" @click="closeModal(selectedAPSA)" autofocus />
    </template>
  </Dialog>
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
          <div v-for="monCA in champsApprentissages" :key="monCA.id" class="d-flex p-2">
            <div class="mr-2" style="padding: 9px;">
              <p class="MonHeadButton">CA{{ monCA.id }}
              <Button icon="pi pi-external-link" @click="RechercheModal(monCA)"><i class="fa fa-plus"></i></Button></p>
            </div>
            <div class="mr-2 flex-grow-1 ">
              <SelectButton v-model="result" :options="monCA.Apsa" optionLabel="libelle" multiple />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ChampApprentissageService from '@/services/ChampApprentissageService';
import ApsaService from '@/services/ApsaService';
import { APSA, ChampApprentissage } from "@/models";

const { champsApprentissages, fetchChampsApprentissages } = ChampApprentissageService();
const { apsas, fetchAllApsa } = ApsaService();

const result = ref([]);
const selectedAPSA = ref([]);

const NomEtablissement = "Lycée Professionnel de St Joseph";

const displayModal = ref(false);
const displayConfirmation = ref(false);
const displayMaximizable = ref(false);
const position = ref('center');
const monCAModal = ref<ChampApprentissage>({id: -1, libelle: "", Apsa:[]});

function toto() {
  console.log('maVariable', selectedAPSA.value);
}

function closeModal(selectedAPSA: APSA){
  displayModal.value = false;
  selectedAPSA.splice(0);
}

function RechercheModal(CA: ChampApprentissage){
  displayModal.value = true;
  monCAModal.value = CA;
  apsas.value.forEach((Value) => {
    monCAModal.value.Apsa.forEach((monAPSA) => {
      if (Value.libelle == monAPSA.libelle) {
        selectedAPSA.value.push(Value);
      }
    });
  });
}

onMounted(async () => {
  await fetchChampsApprentissages();
  await fetchAllApsa();
});
</script>

