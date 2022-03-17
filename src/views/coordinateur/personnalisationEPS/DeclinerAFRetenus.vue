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
              <h4 class="text-dark mb-4">{{ NomEtablissement }}</h4>
            </div>
            <div class="d-flex justify-content-center align-items-center align-content-center">
              <div class="col-3">
                <p class="w-100 m-0">Sélectionner l'APSA :</p>
              </div>
              <div class="col-9">
                <SelectButton v-model="monAPSA" :options="apsaSelects" class="w-100 m-0" optionLabel="libelle" />
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3"></div>
      </div>
      <div class="mb-3">
        <div v-for="monAfRetenu of mesAfRetenus" :key="monAfRetenu.id" class="field-checkbox">
          <i class="pi pi-check-square"></i>{{ '  ' + monAfRetenu.libelle }}
        </div>
      </div>
      <div class="mb-3">
        <Textarea class="w-100" :disabled="propertyDisable" v-model="monCritere" :autoResize="true" rows="5" />
        <Button label="Edit" icon="pi pi-pencil" style="float: right" @click="propertyDisable = !propertyDisable" />
      </div>
    </div>
    <div class="mb-3">
      <Button
        label="Valider"
        style="right: 1rem"
        icon="pi pi-check"
        @click="verif(), $router.push('IndicateurAF')"
        autofocus
      ></Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, unref } from 'vue';
import AfRetenusService from '@/services/AfRetenusService';
import ApsaSelectAnnee from '@/services/ApsaSelectAnneeService';
import { AfRetenus, APSA, AF } from '@/models';

const { apsaSelectsAnnee, fetchAllApsaSelectAnnee } = ApsaSelectAnnee();
const { afRetenus, fetchAllAfRetenus } = AfRetenusService();
let propertyDisable = ref(true);
const NomEtablissement = 'Lycée Professionnel de St Joseph';
const apsaSelects = ref<APSA[]>([]);
const monAPSA = ref<APSA>();

const mesAfRetenus = ref<AF[]>([]);

const monCritere = ref('Text déjà écrit');

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    propertyDisable.value = true;
  }
});

function verif() {
  console.log(afRetenus.value);
}

onMounted(async () => {
  await fetchAllAfRetenus();
  await fetchAllApsaSelectAnnee();
  apsaSelectsAnnee.value.forEach((a) => {
    if (a.Ca.id === 1) {
      apsaSelects.value.push(a.Apsa);
    }
  });
  afRetenus.value.forEach((b) => {
    if (b.ChoixAnnee.champApprentissage.id === 1) {
      mesAfRetenus.value.push(b.Af);
    }
  });
});
</script>
