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
              <h4 class="text-dark mb-4">{{ etablissement.nomEtablissement }}</h4>
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
                v-model="caApsasSelectionnes[monCA.id]"
                :options="monCA.champsApprentissageApsas"
                optionLabel="Apsa.libelle"
                multiple
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 ms-3">
        <Button
          label="Ajouter les APSA sélectionnés"
          style="right: 1rem"
          icon="pi pi-check"
          @click="saveApsasSelectionnees"
          autofocus
        />
        <span v-if="apsaSelectAnneeEnErreur">
          <InlineMessage severity="error"> Veuillez sélectionnez au moins un APSA </InlineMessage>
        </span>
      </div>
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
import { ref, onMounted } from 'vue';
import ChampApprentissageService from '@/services/ChampApprentissageService';
import ApsaService from '@/services/ApsaService';
import UtilisateurService from '@/services/UtilisateurService';
import ApsaSelectAnneeService from '@/services/ApsaSelectAnneeService';
import { APSA, ChampApprentissage, ChampsApprentissageApsa } from '@/models';
import { useRouter } from 'vue-router';

const router = useRouter();

const { champsApprentissages, fetchChampsApprentissages, saveApsaInCa } = ChampApprentissageService();
const { apsas, fetchAllApsa } = ApsaService();
const { etablissement, anneeEnConfig } = UtilisateurService();
const { saveApsaSelectAnnee, fetchAllApsaSelectAnneeByAnnee, apsaSelectAnneeByAnnee } = ApsaSelectAnneeService();

const displayModal = ref(false);
const monCAModal = ref<ChampApprentissage>({ '@id': '', id: -1, libelle: '', color: '', champsApprentissageApsas: [] });
const caApsasSelectionnes = ref<any[]>([]);
const apsaFromCaSelectionnes = ref<APSA[]>([]);
const isLoading = ref(false);
const apsaSelectAnneeEnErreur = ref(false);

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

async function AjoutApsaInCa() {
  const caApsa = apsaFromCaSelectionnes.value.map((apsa) => {
    return {
      '@id': '',
      id: -1,
      Apsa: apsa,
    };
  });

  const listeApsa = ref<APSA[]>([]);
  caApsa.forEach((caApsa) => {
    listeApsa.value.push(caApsa.Apsa);
  });
  await saveApsaInCa(monCAModal.value.id, listeApsa.value);

  champsApprentissages.value.find((ca) => ca.id === monCAModal.value.id)!.champsApprentissageApsas = caApsa;

  closeModal();
}

async function saveApsasSelectionnees() {
  if (!champsNonRempli()) {
    let listForRequest: {
      Ca: number;
      Apsa: number;
      Annee: number;
    }[] = [];
    caApsasSelectionnes.value.forEach((_, idCA) => {
      const ca: ChampApprentissage = champsApprentissages.value.find((ca) => ca.id === idCA)!;
      caApsasSelectionnes.value[idCA].forEach((caApsa: ChampsApprentissageApsa) => {
        if (caApsa) listForRequest.push({ Ca: ca.id, Apsa: caApsa.Apsa.id, Annee: anneeEnConfig.value.id });
      });
    });

    await saveApsaSelectAnnee(listForRequest);
    router.push('ApsaRetenuAF');
  } else {
    console.log('erreur');
  }
}

function champsNonRempli() {
  if (caApsasSelectionnes.value.length < 1) {
    apsaSelectAnneeEnErreur.value = true;
    return true;
  }
  return false;
}

onMounted(async () => {
  isLoading.value = true;
  await fetchChampsApprentissages();
  await fetchAllApsa();

  await fetchAllApsaSelectAnneeByAnnee(anneeEnConfig.value.id);
  if (apsaSelectAnneeByAnnee.value.length > 0) {
    champsApprentissages.value.forEach((ca) => {
      caApsasSelectionnes.value[ca.id] = [];
      apsaSelectAnneeByAnnee.value
        .filter((apsaSelect) => apsaSelect.Ca.id === ca.id)
        .forEach((as) => {
          caApsasSelectionnes.value[as.Ca.id].push(
            ca.champsApprentissageApsas.find((caa) => caa.Apsa.id === as.Apsa.id)
          );
        });
    });
  }
  isLoading.value = false;
});
</script>
