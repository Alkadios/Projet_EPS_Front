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
            <div class="d-flex justify-content-center align-items-center align-content-center">
              <div class="col-3">
                <p class="w-100 m-0">Sélectionner l'APSA :</p>
              </div>
              <div class="col-9">
                <SelectButton v-model="monAPSA" :options="apsaSelects" class="w-100 m-0" optionLabel="Apsa.libelle" />
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3"></div>
      </div>
      <div class="mb-3">
        <div v-for="monAfRetenu of mesAfRetenus" :key="monAfRetenu.id" class="field-checkbox">
          <RadioButton :id="monAfRetenu['@id']" name="monAfRetenu" :value="monAfRetenu" v-model="monAfRetenuSelected" />
          <label style="margin-left: 1rem" :for="monAfRetenu['@id']">{{ monAfRetenu.Af.libelle }}</label>
        </div>
      </div>
      <div class="mb-3">
        <div class="p-3">
          <label style="margin-left: 1rem" for="situation-evaluation">Description de la situation d'évaluation :</label>
        </div>
        <Textarea
          v-model="situationEvaluation"
          id="situation-evaluation"
          class="w-100"
          :autoResize="true"
          rows="5"
          placeholder="Ex : Pour produire une performance maximale connue sur un 800m, utiliser préférentiellement des repères intérieurs afin de réaliser une course avec des variations d’allures optimales régulées par quelques repères extérieurs exprimés par un partenaire."
        />
      </div>
    </div>
    <div class="mb-3">
      <Button label="Valider" style="right: 1rem" @click="ajoutApsaRetenu()" icon="pi pi-check" autofocus></Button>
    </div>
    <div style="position: fixed; bottom: 0; right: 0">
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
import { ref, onMounted, watch } from 'vue';
import AfRetenusService from '@/services/AfRetenusService';
import ApsaRetenuService from '@/services/ApsaRetenuService';
import ApsaSelectAnneeService from '@/services/ApsaSelectAnneeService';
import UtilisateurService from '@/services/UtilisateurService';
import { ApsaSelectAnnee, ApsaRetenu, AfRetenus } from '@/models';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();

const { apsaSelectAnneeByAnnee, fetchAllApsaSelectAnneeByAnnee } = ApsaSelectAnneeService();
const { afRetenus, fetchAllAfRetenus } = AfRetenusService();
const { apsaRetenu, apsasRetenus, saveApsaRetenu, fetchAllApsaRetenu } = ApsaRetenuService();
const { etablissement, anneeEnConfig } = UtilisateurService();

const apsaSelects = ref<ApsaSelectAnnee[]>([]);
const monAPSA = ref<ApsaRetenu>();
const monAfRetenuSelected = ref();
const mesAfRetenus = ref<AfRetenus[]>([]);
const isLoading = ref(false);
const situationEvaluation = ref('');

async function ajoutApsaRetenu() {
  if ((monAfRetenuSelected.value['@id'], situationEvaluation.value, monAPSA.value?.['@id'])) {
    await saveApsaRetenu(monAfRetenuSelected.value['@id'], situationEvaluation.value, monAPSA.value?.['@id']);
    router.push({ name: 'Critere', query: { idApsaRetenu: apsaRetenu.value.id } });
  }
}

watch(
  () => monAPSA.value,
  async () => {
    if (monAPSA.value) {
      isLoading.value = true;
      //await fetchAllAfRetenuByAnneeAndNiveauScolaire(annee.value.id, niveauScolaireSelectionne.value?.id);

      //Mettre fonction
      isLoading.value = false;
    }
  }
);

onMounted(async () => {
  isLoading.value = true;
  await fetchAllAfRetenus();
  await fetchAllApsaRetenu();
  await fetchAllApsaSelectAnneeByAnnee(anneeEnConfig.value.id);
  apsaSelectAnneeByAnnee.value.forEach((a) => {
    if (route.query.idCA) {
      if (a.Ca.id === parseInt(route.query.idCA.toString())) {
        apsaSelects.value.push(a);
      }
    }
  });

  afRetenus.value.forEach((b) => {
    if (route.query.idChoixAnnee) {
      if (b.ChoixAnnee['@id'] === '/api/choix_annees/' + route.query.idChoixAnnee) {
        mesAfRetenus.value.push(b);
      }
    }
  });
  isLoading.value = false;
});
</script>
