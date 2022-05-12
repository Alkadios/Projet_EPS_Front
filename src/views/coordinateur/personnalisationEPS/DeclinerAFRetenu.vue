<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
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
      <Button
        v-if="!verifIsExistSituationEvaluation()"
        label="Valider"
        style="right: 1rem"
        @click="ajoutApsaRetenu()"
        icon="pi pi-check"
        autofocus
      ></Button>
      <Button
        v-else
        @click="changeApsaRetenu(monApsaRetenu!)"
        label="Modifier"
        style="right: 1rem"
        icon="pi pi-pencil"
        autofocus
      ></Button>
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
import ObjectUtils from '@/utils/ObjectUtils';
import UserService from '@/services/UserService';

const { isObjectEmpty } = ObjectUtils();
const { user, redirectToHomePage } = UserService();
const route = useRoute();

const { apsaSelectAnneeByAnnee, fetchAllApsaSelectAnneeByAnnee } = ApsaSelectAnneeService();
const { afRetenus, fetchAllAfRetenus } = AfRetenusService();
const { apsaRetenu, apsasRetenus, saveApsaRetenu, fetchAllApsaRetenu, editApsaRetenu } = ApsaRetenuService();
const { etablissement, anneeEnConfig } = UtilisateurService();

const apsaSelects = ref<ApsaSelectAnnee[]>([]);
const monAPSA = ref<ApsaSelectAnnee>();
const monAfRetenuSelected = ref();
const mesAfRetenus = ref<AfRetenus[]>([]);
const isLoading = ref(false);
const situationEvaluation = ref('');
const monApsaRetenu = ref<ApsaRetenu>();

async function ajoutApsaRetenu() {
  if ((monAfRetenuSelected.value['@id'], situationEvaluation.value, monAPSA.value?.['@id'])) {
    await saveApsaRetenu(monAfRetenuSelected.value['@id'], situationEvaluation.value, monAPSA.value?.['@id']);
    router.push({ name: 'Critere', query: { idApsaRetenu: apsaRetenu.value.id } });
  }
}

async function changeApsaRetenu(monApsaRetenu: ApsaRetenu) {
  if ((monAfRetenuSelected.value['@id'], situationEvaluation.value, monAPSA.value?.['@id'])) {
    await editApsaRetenu(
      monApsaRetenu.id,
      monAfRetenuSelected.value['@id'],
      situationEvaluation.value,
      monAPSA.value?.['@id']
    );
    window.alert('Le critère a bien été modifié !');
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
      if (verifIsExistSituationEvaluation()) {
        situationEvaluation.value = monApsaRetenu.value?.SituationEvaluation!;
      } else {
        situationEvaluation.value = '';
      }
      isLoading.value = false;
    }
  }
);

watch(
  () => monAfRetenuSelected.value,
  async () => {
    if (monAfRetenuSelected.value) {
      isLoading.value = true;

      if (verifIsExistSituationEvaluation()) {
        situationEvaluation.value = monApsaRetenu.value?.SituationEvaluation!;
      } else {
        situationEvaluation.value = '';
      }
      isLoading.value = false;
    }
  }
);

function verifIsExistSituationEvaluation() {
  if (monAfRetenuSelected.value && monAPSA.value) {
    if (
      apsasRetenus.value.find(
        (ar) => ar.AfRetenu.id === monAfRetenuSelected.value.id && ar.ApsaSelectAnnee['@id'] === monAPSA.value?.['@id']
      )
    ) {
      monApsaRetenu.value = apsasRetenus.value.find(
        (ar) => ar.AfRetenu.id === monAfRetenuSelected.value.id && ar.ApsaSelectAnnee['@id'] === monAPSA.value?.['@id']
      );
      return true;
    }
  }
  return false;
}

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (user.value.roles != 'Admin') {
    redirectToHomePage();
  } else {
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
  if (route.query.idApsa) {
    monAPSA.value = apsaSelects.value.find((asa) => (asa.Apsa.id = parseInt(route.query.idApsa!.toString())));

  if (route.query.idAfRetenu) {
    monAfRetenuSelected.value = mesAfRetenus.value.find(
      (afr) => (afr.id = parseInt(route.query.idAfRetenu!.toString()))
    );
  }
});
</script>
