<template>
  <div class="card shadow-lg o-hidden border-0 my-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div id="ContentScreen" class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2">
                Personnalisation de l'équipe EPS <br />
                au
              </p>
              <h4 class="text-dark mb-4">{{ etablissement.nomEtablissement }}</h4>
            </div>
          </div>
          <div id="mesClasses">
            <div class="row">
              <div id="EvaluationClasse" class="col-md-5">
                <div class="d-flex">
                  <div class="p-2">Mes Classes :</div>
                  <div>
                    <Dropdown
                      v-model="maClasseSelect"
                      :options="classesByAnneeAndProfesseur"
                      optionLabel="libelleClasse"
                      optionValue="id"
                      placeholder="Ma Classe"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <div class="d-flex" v-if="maClasseSelect != null">
                  <div class="p-2">Mes sports :</div>
                  <div>
                    <Dropdown
                      v-model="monSportSelect"
                      :options="mesAPSAs"
                      optionLabel="Apsa.libelle"
                      optionValue="Apsa.id"
                      placeholder="Mes sports"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="myTableEleves">
            <div class="row">
              <div class="d-flex justify-content-start">
                <div id="mesEleves" class="col-md-4 p-2">
                  <Button style="margin-bottom: 1rem; width: 100%" label="Tous" />
                  <Listbox
                    @change="reinitialiserIndicateur()"
                    v-model="monEleveSelect"
                    :options="mesEleves"
                    optionLabel="nom"
                    listStyle="max-height:250px"
                    style="width: 100%; overflow-y: scroll; max-height: 380px"
                  >
                    <template #option="monEleve">
                      <div class="Eleve-item">
                        <div>{{ monEleve.option.nom }} {{ monEleve.option.prenom }}</div>
                      </div>
                    </template>
                  </Listbox>
                </div>
                <div class="offset-md-1 col-md-7">
                  <div id="CriteresEvaluations">
                    <div class="card" v-for="monCritere in mesCriteres" :key="monCritere.id">
                      <Divider align="center" type="dashed">
                        <b>{{ monCritere.titre }}</b>
                      </Divider>
                      <div>
                        <SelectButton
                          class="d-flex justify-content-around"
                          style="padding-bottom: 1rem"
                          v-model="monIndicateur[monCritere.id]"
                          @click="addEvaluation(monCritere)"
                          :options="monCritere.Indicateur"
                          optionLabel="libelle"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 ms-3">
        <Button label="Annuler" icon="pi pi-check" @click="verif()" autofocus></Button>
        <Button label="Terminer l'évaluation" icon="pi pi-check" style="left: 1rem" @click="verif()" autofocus></Button>
      </div>
      <div class="mb-3"></div>
      <div style="position: fixed; bottom: 0; right: 2rem">
        <ProgressSpinner
          v-if="isLoading"
          style="float: right; width: 50px; height: 50px"
          strokeWidth="8"
          animationDuration=".5s"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import UtilisateurService from '@/services/UtilisateurService';
import ApsaRetenuService from '@/services/ApsaRetenuService';
import CritereService from '@/services/CritereService';
import ClasseService from '@/services/ClasseService';
import { ApsaSelectAnnee, Critere, Eleve, EvaluationEleve, Indicateur } from '@/models';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
const { apsasRetenusByEtablissementAndAnnee, fetchApsaRetenuByAnneeAndEtablissement } = ApsaRetenuService();
const { classesByAnneeAndProfesseur, fetchClasseByAnneeAndProf } = ClasseService();
const { etablissement, annee } = UtilisateurService();
const isLoading = ref(false);

const mesEleves = ref<Eleve[]>([]);
const mesAPSAs = ref<ApsaSelectAnnee[]>([]);
const mesCriteres = ref<Critere[]>([]);
const monIndicateur = ref([]);
const maClasseSelect = ref();
const monSportSelect = ref();
const monEleveSelect = ref<Eleve>();
const idIndicateurTrouve = ref<number>();

const monEvaluation = ref<newEvaluation>({ evaluationEleve: [] as newEvaluationEleve[] } as newEvaluation);
interface newEvaluationEleve {
  Indicateur: number;
  Eleve: number;
  autoEval: boolean;
}
interface newEvaluation {
  Date: Date;
  evaluationEleve: newEvaluationEleve[];
}
function verif() {}

async function addEvaluation(critere: Critere) {
  // if(monEvaluation.value.evaluationEleve.find(e => e.Indicateur))
  // monEvaluation.value.evaluationEleve
  if (checkIfCritereExist(critere)) {
    console.log('critere trouvé');
    const indexEvaluationEleve = monEvaluation.value.evaluationEleve.findIndex(
      (e) => e.Indicateur === idIndicateurTrouve.value && e.Eleve === monEleveSelect.value?.id
    );
    monEvaluation.value.evaluationEleve.splice(indexEvaluationEleve, 1);
  }
  const monEvalEleve = {
    Indicateur: monIndicateur.value[critere.id]?.id,
    Eleve: monEleveSelect.value?.id,
    autoEval: false,
  } as newEvaluationEleve;
  monEvaluation.value.evaluationEleve.push(monEvalEleve);

  console.log(' monEvaluation : ', monEvaluation.value.evaluationEleve);
}
function checkIfCritereExist(critere: Critere): boolean {
  const trouve = ref(false);
  critere.Indicateur.forEach((indicateur) => {
    const evalEleve = monEvaluation.value.evaluationEleve.find(
      (e) => e.Indicateur === indicateur.id && monEleveSelect.value?.id === e.Eleve
    );
    if (evalEleve) {
      trouve.value = true;
      idIndicateurTrouve.value = evalEleve.Indicateur;
    }
  });
  return trouve.value;
}

onMounted(async () => {
  isLoading.value = true;
  if (annee) {
    await fetchClasseByAnneeAndProf(1, 1);
    await fetchApsaRetenuByAnneeAndEtablissement(1, 1);
  }

  isLoading.value = false;
});

watch(
  () => maClasseSelect.value,
  async () => {
    if (maClasseSelect.value) {
      isLoading.value = true;
      mesElevesByClasse(maClasseSelect.value);
      mesApsaByAnneeAndClasseAndEtablissement(maClasseSelect.value);
      isLoading.value = false;
      console.log('apsasRetenusByEtablissementAndAnnee : ', apsasRetenusByEtablissementAndAnnee.value);
    }
  }
);

watch(
  () => monSportSelect.value,
  () => {
    if (monSportSelect.value) {
      isLoading.value = true;
      mesCriteres.value = getMesCriteres(monSportSelect.value);
      isLoading.value = false;
    }
  }
);

function mesElevesByClasse(idClasse: number) {
  mesEleves.value = classesByAnneeAndProfesseur.value.find((a) => a.id === idClasse)!.eleves;
}

function mesApsaByAnneeAndClasseAndEtablissement(idClasse: number) {
  apsasRetenusByEtablissementAndAnnee.value.forEach((a) => {
    if (idClasse) {
      if (a.AfRetenu.ChoixAnnee.Niveau === '/api/niveau_scolaires/' + idClasse) {
        mesAPSAs.value.push(a.ApsaSelectAnnee);
      }
    }
  });
}

function reinitialiserIndicateur() {
  const evalEleve = monEvaluation.value.evaluationEleve.find((e) => e.Eleve === monEleveSelect.value?.id);
  if (evalEleve) {
    apsasRetenusByEtablissementAndAnnee.value
      .find((a) => a.ApsaSelectAnnee.Apsa.id === monSportSelect.value)
      ?.criteres.forEach((c) => (monIndicateur.value[c.id] = c.Indicateur.find((i) => evalEleve.Indicateur === i.id)));
  } else {
    apsasRetenusByEtablissementAndAnnee.value
      .find((a) => a.ApsaSelectAnnee.Apsa.id === monSportSelect.value)
      ?.criteres.forEach((c) => (monIndicateur.value[c.id] = {}));
  }
}

function getMesCriteres(idApsaRetenu: number) {
  reinitialiserIndicateur();
  return apsasRetenusByEtablissementAndAnnee.value.find((a) => a.ApsaSelectAnnee.Apsa.id === idApsaRetenu)!.criteres;
}
</script>
