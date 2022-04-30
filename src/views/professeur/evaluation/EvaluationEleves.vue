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
              <h4 class="text-dark mb-4">{{ etablissement.nom }}</h4>
            </div>
          </div>
          <div id="mesClasses">
            <div class="row">
              <div id="EvaluationClasse" class="col-md-5">
                <div class="d-flex">
                  <div class="p-2">Mes Classes :</div>
                  <div>
                    <Dropdown
                      v-model="classeSelectionner"
                      :options="classesByAnneeAndProfesseur"
                      optionLabel="libelleClasse"
                      dataKey="id"
                      placeholder="Choisir une classe"
                      @change="onClasseChange()"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-5 offset-md-2">
                <div class="d-flex" v-if="classeSelectionner != null">
                  <div class="p-2">Mes Apsas :</div>
                  <div>
                    <Dropdown
                      v-model="apsaRetenuSelectionner"
                      :options="apsasRetenusByNiveauScolaire"
                      optionLabel="ApsaSelectAnnee.Apsa.libelle"
                      dataKey="id"
                      placeholder="Choisir une Apsa"
                      @change="onApsaRetenuChange()"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="p-5">
              <div class="col-md-12">
                <div class="d-flex" v-if="apsaRetenuSelectionner != null">
                  <div class="p-2">Mes Situation d'évaluation :</div>
                  <Dropdown
                    v-model="ApsaRetenuBySituationEvaluation"
                    :options="situationsEvaluationByNiveauScolaireAndApsa"
                    optionLabel="SituationEvaluation"
                    dataKey="id"
                    placeholder="Choisir une situation d'évaluation"
                    @change="onSituationEvaluationChange()"
                  />
                </div>
              </div>
            </div>
          </div>
          <div id="myTableEleves">
            <div class="row">
              <div class="d-flex justify-content-start">
                <div id="elevesByClasse" v-if="ApsaRetenuBySituationEvaluation != null" class="col-md-4 p-2">
                  <Button style="margin-bottom: 1rem; width: 100%" label="Tous" />
                  <Listbox
                    v-model="eleveSelectionne"
                    :options="elevesByClasse"
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
                  <div id="CriteresEvaluations" v-if="ApsaRetenuBySituationEvaluation != null">
                    <div v-for="monCritere in criteresByApsaSelectionner" :key="monCritere.id" class="card">
                      <Divider align="center" type="dashed">
                        <b>{{ monCritere.titre }}</b>
                      </Divider>
                      <div>
                        <Button
                          v-for="indicateur of monCritere.Indicateur"
                          :key="indicateur.id"
                          :label="indicateur.libelle"
                          :style="!checkIfIndicateurIsSelectionner(indicateur) ? 'background-color: bisque' : ''"
                          :class="checkIfIndicateurIsSelectionner(indicateur) ? 'primary' : ''"
                          @click="addIndicateurInEvaluation(monCritere, indicateur)"
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
        <Button label="Annuler" icon="pi pi-check" @click="verif()"></Button>
        <Button label="Terminer l'évaluation" icon="pi pi-check" style="left: 1rem" @click="verif()"></Button>
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
import { ref, onMounted, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UtilisateurService from '@/services/UtilisateurService';
import ApsaRetenuService from '@/services/ApsaRetenuService';
import ApsaSelectAnneeService from '@/services/ApsaSelectAnneeService';
import ClasseService from '@/services/ClasseService';
import { Critere, Eleve, Indicateur, Classe, ApsaRetenu, NiveauScolaire } from '@/models';

const route = useRoute();
const router = useRouter();

const { apsasRetenusByEtablissementAndAnnee, fetchApsaRetenuByAnneeAndEtablissement } = ApsaRetenuService();
const { classesByAnneeAndProfesseur, fetchClasseByAnneeAndProf } = ClasseService();
const { apsaSelectAnneeByAnneeAndEtablissement, fetchAllApsaSelectAnneeByAnneeAndEtablissement } =
  ApsaSelectAnneeService();
const { etablissement, annee } = UtilisateurService();
const isLoading = ref(false);

const elevesByClasse = ref<Eleve[]>([]);
const apsasRetenusByNiveauScolaire = ref<ApsaRetenu[]>([]);
const situationsEvaluationByNiveauScolaireAndApsa = ref<ApsaRetenu[]>([]);
const criteresByApsaSelectionner = ref<Critere[]>([]);
const indicateursEleveSelectionner = ref<indicateurEleve[]>([]);
const ApsaRetenuBySituationEvaluation = ref<ApsaRetenu>();
const classeSelectionner = ref<Classe>();
const apsaRetenuSelectionner = ref<ApsaRetenu>();
const eleveSelectionne = ref<Eleve>();
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

interface indicateurEleve {
  critere: Critere;
  indicateur: Indicateur;
  eleve: Eleve;
}
function verif() {
  console.log('elevesByClasse : ', elevesByClasse.value);
  console.log('apsasRetenusByNiveauScolaire : ', apsasRetenusByNiveauScolaire.value);
  console.log('criteresByApsaSelectionner : ', criteresByApsaSelectionner.value);
  console.log('indicateursEleveSelectionner : ', indicateursEleveSelectionner.value);
  console.log('classeSelectionner : ', classeSelectionner.value);
  console.log('apsaRetenuSelectionner : ', apsaRetenuSelectionner.value);
  console.log('eleveSelectionne : ', eleveSelectionne.value);
  console.log('apsasRetenusByEtablissementAndAnnee : ', apsasRetenusByEtablissementAndAnnee.value);
  console.log('situationsEvaluationByNiveauScolaireAndApsa : ', situationsEvaluationByNiveauScolaireAndApsa.value);
}

async function addIndicateurInEvaluation(unCritere: Critere, unIndicateur: Indicateur) {
  const nouveauIndicateurEleve = {
    critere: unCritere,
    indicateur: unIndicateur,
    eleve: eleveSelectionne.value,
  } as indicateurEleve;

  const indexIndicateurEleveAlreadyExist = indicateursEleveSelectionner.value.findIndex(
    (ies) =>
      ies.critere.id === nouveauIndicateurEleve.critere.id &&
      ies.eleve.id === nouveauIndicateurEleve.eleve.id &&
      ies.indicateur.id != nouveauIndicateurEleve.indicateur.id
  );
  //Si un indicateurEleve existe déjà (même élève & même critère mais l'indicateur est différent) -> on le remplace
  if (indexIndicateurEleveAlreadyExist != -1) {
    indicateursEleveSelectionner.value[indexIndicateurEleveAlreadyExist] = nouveauIndicateurEleve;
  } else {
    // Sinon on l'ajoute
    indicateursEleveSelectionner.value.push(nouveauIndicateurEleve);
  }
}

onMounted(async () => {
  isLoading.value = true;
  await fetchAllApsaSelectAnneeByAnneeAndEtablissement(1, 1);
  await fetchClasseByAnneeAndProf(1, 1);
  await fetchApsaRetenuByAnneeAndEtablissement(1, 1);
  isLoading.value = false;
});

function onClasseChange() {
  if (classeSelectionner.value) {
    isLoading.value = true;
    elevesByClasse.value = getElevesByClasse(classeSelectionner.value)!;
    apsasRetenusByNiveauScolaire.value = getApsasRetenusByNiveauScolaire(classeSelectionner.value.NiveauScolaire);
    isLoading.value = false;
  }
}

function onSituationEvaluationChange() {
  if (ApsaRetenuBySituationEvaluation.value) {
    isLoading.value = true;
    criteresByApsaSelectionner.value = getcriteresByApsaSelectionner(ApsaRetenuBySituationEvaluation.value);
    isLoading.value = false;
  }
}

function onApsaRetenuChange() {
  if (apsaRetenuSelectionner.value) {
    isLoading.value = true;
    situationsEvaluationByNiveauScolaireAndApsa.value = [];
    apsasRetenusByNiveauScolaire.value.forEach((a) => {
      if (a.ApsaSelectAnnee['@id'] === apsaRetenuSelectionner.value?.ApsaSelectAnnee['@id']) {
        situationsEvaluationByNiveauScolaireAndApsa.value.push(a);
      }
    });
    isLoading.value = false;
  }
}

function getElevesByClasse(uneClasse: Classe) {
  return classesByAnneeAndProfesseur.value.find((classeProf) => classeProf.id === uneClasse.id)?.eleves;
}

function getApsasRetenusByNiveauScolaire(unNiveauScolaire: string | NiveauScolaire) {
  return apsasRetenusByEtablissementAndAnnee.value
    .filter((apsaRetenu) => apsaRetenu.AfRetenu.ChoixAnnee.Niveau === unNiveauScolaire)
    .map((apsaR) => {
      return toRaw(apsaR);
    });
}

function checkIfIndicateurIsSelectionner(unIndicateur: Indicateur) {
  if (
    indicateursEleveSelectionner.value.find(
      (ies) => toRaw(ies).indicateur.id === unIndicateur.id && ies.eleve.id === eleveSelectionne.value?.id
    )
  )
    return true;
  else return false;
}

function getcriteresByApsaSelectionner(ApsaRetenu: ApsaRetenu) {
  return apsasRetenusByEtablissementAndAnnee.value.find(
    (a) => a.ApsaSelectAnnee['@id'] === ApsaRetenu.ApsaSelectAnnee['@id']
  )!.criteres;
}
</script>
