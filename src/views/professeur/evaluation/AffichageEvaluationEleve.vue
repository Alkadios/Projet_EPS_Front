<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div id="ContentScreen" class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2">
                Aperçu des évaluations pour mes classes <br />
                de l'établissement
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
                    v-model="situationEvaluationSelectionner"
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
          <div class="d-flex row" v-if="situationEvaluationSelectionner != null">
            <div class="col-md-3" v-for="monGraphique in monAffichageGraphique" :key="monGraphique.id">
              <Chart
                v-if="monGraphique.labels.length > 0"
                type="pie"
                :data="monGraphique"
                :options="lightOptionsCammenbert"
              />
              <div v-if="monGraphique.labels.length > 0" class="d-flex justify-content-center p-2">
                <B>{{ monGraphique.critere }}</B>
              </div>
            </div>
          </div>
          <div id="myTableEleves" v-if="situationEvaluationSelectionner != null">
            <div class="row">
              <div class="d-flex justify-content-start">
                <div id="elevesByClasse" class="col-md-4 p-2">
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
                  <div id="CriteresEvaluations" v-if="situationEvaluationSelectionner != null && !eleveSelectionne">
                    <h1>Veuillez sélectionner un élève</h1>
                  </div>
                  <div
                    id="CriteresEvaluations"
                    v-if="situationEvaluationSelectionner != null && eleveSelectionne != null"
                  >
                    <div v-for="monGraphiqueEleve in monAffichageGraphiqueByEleve" :key="monGraphiqueEleve.id">
                      <Divider align="center" type="dashed" v-if="monGraphiqueEleve.labels.length != 0">
                        <b>{{ monGraphiqueEleve.critere }}</b>
                      </Divider>
                      <div class="row">
                        <div class="col-md-6 offset-md-3" v-if="monGraphiqueEleve.labels.length != 0">
                          <Chart type="pie" :data="monGraphiqueEleve" :options="lightOptionsCammenbert" />
                        </div>
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
import { ref, onMounted, toRaw, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UtilisateurService from '@/services/UtilisateurService';
import ApsaRetenuService from '@/services/ApsaRetenuService';
import ClasseService from '@/services/ClasseService';
import ObjectUtils from '@/utils/ObjectUtils';
import type { Eleve, Classe, ApsaRetenu, NiveauScolaire, APSA, ChampApprentissage } from '@/models';
import UserService from '@/services/UserService';
import ProfesseurService from '@/services/ProfesseurService';

const { fetchProfByUser, professeurByUser } = ProfesseurService();
const { user, redirectToHomePage } = UserService();
const route = useRoute();
const router = useRouter();
const { apsasRetenusByEtablissementAndAnnee, fetchApsaRetenuByAnneeAndEtablissement } = ApsaRetenuService();
const { classesByAnneeAndProfesseur, fetchClasseByAnneeAndProf } = ClasseService();
const { etablissement, anneeEnCours } = UtilisateurService();
const { isObjectEmpty } = ObjectUtils();
const isLoading = ref(false);

const elevesByClasse = ref<Eleve[]>([]);
const apsasRetenusByNiveauScolaire = ref<ApsaRetenu[]>([]);
const situationsEvaluationByNiveauScolaireAndApsa = ref<ApsaRetenu[]>([]);
const classeSelectionner = ref<Classe>();
const apsaSelectionner = ref<APSA>();
const situationEvaluationSelectionner = ref<ApsaRetenu>();
const eleveSelectionne = ref<Eleve>();
const listeApsa = ref<APSA[]>([]);
const lightOptionsCammenbert = ref({
  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
    },
  },
});
const monAffichageGraphique = ref<newAffichageGraphique[]>([
  { datasets: [] as datasetsEvaluation[] } as newAffichageGraphique,
]);
const monAffichageGraphiqueByEleve = ref<newAffichageGraphique[]>([
  { datasets: [] as datasetsEvaluation[] } as newAffichageGraphique,
]);

interface newAffichageGraphique {
  critere: string;
  id: number;
  labels: string[];
  datasets: datasetsEvaluation[];
}

interface datasetsEvaluation {
  data: number[];
  backgroundColor: string[];
}

function onSituationEvaluationChange() {
  monAffichageGraphique.value = [];
  let indexGraphiqueClasseByCritere = 0;
  situationEvaluationSelectionner.value?.criteres.forEach((c) => {
    monAffichageGraphique.value[indexGraphiqueClasseByCritere] = {
      critere: c.titre,
      id: indexGraphiqueClasseByCritere,
      labels: [],
      datasets: [],
    };
    monAffichageGraphique.value[indexGraphiqueClasseByCritere].datasets = [{ data: [], backgroundColor: [] }];
    c.Indicateur.forEach((i) => {
      monAffichageGraphique.value[indexGraphiqueClasseByCritere].labels.push(i.libelle);
      monAffichageGraphique.value[indexGraphiqueClasseByCritere].datasets[0].data.push(i.evaluationEleves.length);
      monAffichageGraphique.value[indexGraphiqueClasseByCritere].datasets[0].backgroundColor.push(i.color);
    });
    indexGraphiqueClasseByCritere++;
  });
}

function verif() {}

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (user.value.roles != 'Professeur') {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    await fetchProfByUser(user.value.id);
    await fetchClasseByAnneeAndProf(anneeEnCours.value.id, professeurByUser.value.id);
    await fetchApsaRetenuByAnneeAndEtablissement(anneeEnCours.value.id, etablissement.value.id);
    isLoading.value = false;
  }
});

watch(
  () => eleveSelectionne.value,
  () => {
    if (!isObjectEmpty(eleveSelectionne.value)) {
      monAffichageGraphiqueByEleve.value = [];
      let indexGraphiqueClasseByCriterebyEleves = 0;
      situationEvaluationSelectionner.value?.criteres.forEach((c) => {
        monAffichageGraphiqueByEleve.value[indexGraphiqueClasseByCriterebyEleves] = {
          critere: c.titre,
          id: indexGraphiqueClasseByCriterebyEleves,
          labels: [],
          datasets: [],
        };
        monAffichageGraphiqueByEleve.value[indexGraphiqueClasseByCriterebyEleves].datasets = [
          { data: [], backgroundColor: [] },
        ];
        c.Indicateur.forEach((i) => {
          if (i.evaluationEleves.find((f) => f.Eleve['@id'] === eleveSelectionne.value?.['@id'])) {
            let nb = 0;
            monAffichageGraphiqueByEleve.value[indexGraphiqueClasseByCriterebyEleves].labels.push(i.libelle);
            i.evaluationEleves.forEach((ee) => {
              if (ee.Eleve['@id'] === eleveSelectionne.value?.['@id']) {
                nb++;
              }
            });
            monAffichageGraphiqueByEleve.value[indexGraphiqueClasseByCriterebyEleves].datasets[0].data.push(nb);
            monAffichageGraphiqueByEleve.value[indexGraphiqueClasseByCriterebyEleves].datasets[0].backgroundColor.push(
              i.color
            );
          }
        });
        indexGraphiqueClasseByCriterebyEleves++;
      });
    }
  }
);

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
</script>
