<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div id="ContentScreen" class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2">
                Outil d'évaluation <br />
                pour l'établissement
              </p>
              <h4 class="text-dark mb-4">{{ etablissement.nom }}</h4>
            </div>
          </div>
          <div id="mesClasses">
            <div class="row">
              <div id="EvaluationClasse" class="col-md-5">
                <div class="d-flex justify-content-center">
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
                <div class="d-flex justify-content-center" v-if="classeSelectionner != null">
                  <div>
                    <Dropdown
                      v-model="apsaSelectionner"
                      :options="listeApsa"
                      optionLabel="libelle"
                      dataKey="id"
                      placeholder="Choisir une Apsa"
                      @change="onApsaChange()"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="p-5">
              <div class="col-md-12">
                <div class="d-flex justify-content-center" v-if="apsaSelectionner != null">
                  <Dropdown
                    v-model="apsaRetenuSelectionner"
                    :options="situationsEvaluationByNiveauScolaireAndApsa"
                    optionLabel="SituationEvaluation"
                    dataKey="id"
                    placeholder="Choisir une situation d'évaluation"
                  />
                </div>
              </div>
            </div>
          </div>
          <div id="myTableEleves">
            <div class="row">
              <div class="d-flex justify-content-start">
                <div id="elevesByClasse" v-if="apsaRetenuSelectionner != null" class="col-md-4 p-2">
                  <Button
                    label="Tout les élèves"
                    style="margin-bottom: 1rem; width: 100%"
                    :style="!isCheckButtonTous ? 'background-color: bisque' : ''"
                    :class="isCheckButtonTous === true ? 'primary' : ''"
                    @click="onClickButtonTous()"
                  />
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
                  <div
                    id="CriteresEvaluations"
                    v-if="apsaRetenuSelectionner != null && (isCheckButtonTous == true || eleveSelectionne != null)"
                  >
                    <div v-for="monCritere in apsaRetenuSelectionner.criteres" :key="monCritere.id" class="card">
                      <Divider align="center" type="dashed">
                        <b>{{ monCritere.titre }}</b>
                      </Divider>
                      <div>
                        <Button
                          v-for="indicateur of monCritere.Indicateur"
                          :key="indicateur.id"
                          :label="indicateur.libelle"
                          :style="
                            !checkIfIndicateurIsSelectionner(indicateur) ? 'background-color: ' + indicateur.color : ''
                          "
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
        <Button label="Annuler" @click="router.push('/TableauDeBordConfig')"></Button>
        <Button label="Terminer l'évaluation" icon="pi pi-check" style="left: 1rem" @click="saveEvaluation()"></Button>
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
import { ref, onMounted, toRaw, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UtilisateurService from '@/services/UtilisateurService';
import ApsaRetenuService from '@/services/ApsaRetenuService';
import ClasseService from '@/services/ClasseService';
import UserService from '@/services/UserService';
import EvaluationEleveService from '@/services/EvaluationEleveService';
import ObjectUtils from '@/utils/ObjectUtils';
import type { Critere, Eleve, Indicateur, Classe, ApsaRetenu, NiveauScolaire, APSA } from '@/models';
import ProfesseurService from '@/services/ProfesseurService';
import Role from '@/constants/Role';

const { fetchProfByUser, professeurByUser } = ProfesseurService();
const route = useRoute();
const router = useRouter();

const { apsasRetenusByEtablissementAndAnnee, fetchApsaRetenuByAnneeAndEtablissement } = ApsaRetenuService();
const { classesByAnneeAndProfesseur, fetchClasseByAnneeAndProf } = ClasseService();
const { saveEvaluationEleve } = EvaluationEleveService();
const { etablissement, anneeEnCours } = UtilisateurService();
const { user, token, redirectToHomePage } = UserService();
const { isObjectEmpty } = ObjectUtils();
const isLoading = ref(false);

const elevesByClasse = ref<Eleve[]>([]);
const apsasRetenusByNiveauScolaire = ref<ApsaRetenu[]>([]);
const situationsEvaluationByNiveauScolaireAndApsa = ref<ApsaRetenu[]>([]);
const indicateursEleveSelectionner = ref<indicateurEleve[]>([]);
const classeSelectionner = ref<Classe>();
const apsaSelectionner = ref<APSA>();
const apsaRetenuSelectionner = ref<ApsaRetenu>();
const eleveSelectionne = ref<Eleve>();
const listeApsa = ref<APSA[]>([]);
const isCheckButtonTous = ref(false);
const monEvaluation = ref<newEvaluation>({ evaluationEleve: [] as newEvaluationEleve[] } as newEvaluation);

interface newEvaluationEleve {
  Indicateur: number;
  Eleve: number;
  autoEval: boolean;
}
interface newEvaluation {
  Date: string;
  evaluationEleve: newEvaluationEleve[];
}

interface indicateurEleve {
  critere: Critere;
  indicateur: Indicateur;
  eleve: Eleve;
}

function onClickButtonTous() {
  isCheckButtonTous.value = true;
}

async function addIndicateurInEvaluation(unCritere: Critere, unIndicateur: Indicateur) {
  if (!isCheckButtonTous.value) {
    if (!isObjectEmpty(eleveSelectionne.value)) {
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
  } else {
    elevesByClasse.value.forEach((e) => {
      const nouveauIndicateurPourChaqueEleve = {
        critere: unCritere,
        indicateur: unIndicateur,
        eleve: e,
      } as indicateurEleve;

      const indexIndicateurEleveAlreadyExist = indicateursEleveSelectionner.value.findIndex(
        (ies) =>
          ies.critere.id === nouveauIndicateurPourChaqueEleve.critere.id &&
          ies.eleve.id === nouveauIndicateurPourChaqueEleve.eleve.id &&
          ies.indicateur.id != nouveauIndicateurPourChaqueEleve.indicateur.id
      );

      //Si un indicateurEleve existe déjà (même élève & même critère mais l'indicateur est différent) -> on le remplace
      if (indexIndicateurEleveAlreadyExist != -1) {
        indicateursEleveSelectionner.value[indexIndicateurEleveAlreadyExist] = nouveauIndicateurPourChaqueEleve;
      } else {
        // Sinon on l'ajoute
        indicateursEleveSelectionner.value.push(nouveauIndicateurPourChaqueEleve);
      }
    });
  }
}

watch(
  () => eleveSelectionne.value,
  () => {
    if (!isObjectEmpty(eleveSelectionne.value)) {
      isCheckButtonTous.value = false;
    }
  }
);

watch(
  () => isCheckButtonTous.value,
  () => {
    eleveSelectionne.value = {} as Eleve;
  }
);

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (!user.value.roles.includes(Role.PROF)) {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    await fetchProfByUser(user.value.id);
    await fetchClasseByAnneeAndProf(anneeEnCours.value.id, professeurByUser.value.id);
    await fetchApsaRetenuByAnneeAndEtablissement(anneeEnCours.value.id, etablissement.value.id);
    isLoading.value = false;
  }
});

function onClasseChange() {
  if (classeSelectionner.value) {
    isLoading.value = true;
    elevesByClasse.value = getElevesByClasse(classeSelectionner.value)!;
    apsasRetenusByNiveauScolaire.value = getApsasRetenusByNiveauScolaire(classeSelectionner.value.NiveauScolaire);
    listeApsa.value = [];
    //Evite les doublons si une apsa à plusiers situation d'évaluation

    apsasRetenusByNiveauScolaire.value.forEach((ar) => {
      if (!listeApsa.value.find((a) => a.id === ar.ApsaSelectAnnee.Apsa.id)) {
        listeApsa.value.push(ar.ApsaSelectAnnee.Apsa);
      }
    });
    isLoading.value = false;
  }
}

function onApsaChange() {
  if (apsaSelectionner.value) {
    isLoading.value = true;

    situationsEvaluationByNiveauScolaireAndApsa.value = apsasRetenusByNiveauScolaire.value.filter(
      (ar) => ar.ApsaSelectAnnee.Apsa.id === apsaSelectionner.value?.id
    );
    isLoading.value = false;
  }
}

function getElevesByClasse(uneClasse: Classe) {
  return classesByAnneeAndProfesseur.value.find((classeProf) => classeProf.id === uneClasse.id)?.eleves;
}

function getApsasRetenusByNiveauScolaire(unNiveauScolaire: NiveauScolaire) {
  return apsasRetenusByEtablissementAndAnnee.value
    .filter((apsaRetenu) => apsaRetenu.AfRetenu.ChoixAnnee.Niveau['@id'] === unNiveauScolaire['@id'])
    .map((apsaR) => {
      return toRaw(apsaR);
    });
}

function checkIfIndicateurIsSelectionner(unIndicateur: Indicateur) {
  let idEleve = 0;
  if (isCheckButtonTous.value) idEleve = elevesByClasse.value[0].id;
  else idEleve = eleveSelectionne.value?.id!;
  if (
    indicateursEleveSelectionner.value.find(
      (ies) => toRaw(ies).indicateur.id === unIndicateur.id && ies.eleve.id === idEleve
    )
  )
    return true;
  else return false;
}

async function saveEvaluation() {
  isLoading.value = true;
  if (indicateursEleveSelectionner.value != null) {
    monEvaluation.value.Date = new Date().toLocaleDateString('en-CA');
    monEvaluation.value.evaluationEleve = getEvaluationEleveForRequest(indicateursEleveSelectionner.value);
    await saveEvaluationEleve(monEvaluation.value.Date, monEvaluation.value.evaluationEleve);
  }
  router.push('/AffichageEvaluationEleve');
  isLoading.value = false;
}

function getEvaluationEleveForRequest(listeIndicateurEleve: indicateurEleve[]) {
  return listeIndicateurEleve.map((ie) => {
    return { Indicateur: ie.indicateur.id, Eleve: ie.eleve.id, autoEval: false };
  });
}
</script>
