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
                      placeholder="Ma Classe"
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
                    v-model="monEleveSelect"
                    :options="mesEleves"
                    :filter="true"
                    optionLabel="nom"
                    listStyle="max-height:250px"
                    style="width: 100%; overflow-y: scroll; max-height: 380px"
                    filterPlaceholder="Recherche"
                  >
                    <template #option="monEleve">
                      <div class="Eleve-item">
                        <div>{{ monEleve.option.nom }} {{ monEleve.option.prenom }}</div>
                      </div>
                    </template>
                  </Listbox>
                </div>
                <div class="offset-md-1 col-md-7">
                  <div class="card" id="CriteresEvaluations">
                    <Divider align="center" type="dashed">
                      <b>Center</b>
                    </Divider>
                    <p>
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                      deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                      provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
                      fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
                      nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                    <Divider align="center" type="dashed">
                      <b>Center</b>
                    </Divider>
                    <p>
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                      deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                      provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
                      fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
                      nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 ms-3">
        <Button label="Annuler" icon="pi pi-check" @click="verif()" autofocus></Button>
        <Button
          label="Terminer l'évaluation"
          icon="pi pi-check"
          style="left: 1rem"
          @click="router.push('DeclinerAFRetenus')"
          autofocus
        ></Button>
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
import { ApsaSelectAnnee, Eleve } from '@/models';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
const { criteres, fetchCriteres } = CritereService();
const { apsasRetenusByEtablissementAndAnnee, fetchApsaRetenuByAnneeAndEtablissement } = ApsaRetenuService();
const { classesByAnneeAndProfesseur, fetchClasseByAnneeAndProf } = ClasseService();
const { etablissement, annee } = UtilisateurService();
const isLoading = ref(false);

const mesIndicateurs = ref([
  { name: 'Test non réalisé', code: '0' },
  { name: 'Maitrise insuffisante', code: '1' },
  { name: 'Maitrise fragile', code: '2' },
  { name: 'Maitrise satisfaisante', code: '3' },
  { name: 'Très bonne maitrise', code: '4' },
]);

const mesEleves = ref<Eleve[]>([]);
const mesAPSAs = ref<ApsaSelectAnnee[]>([]);
const maClasseSelect = ref();
const monSportSelect = ref();
const monEleveSelect = ref();

async function verif() {
  console.log('criteres : ', criteres.value);
}

onMounted(async () => {
  isLoading.value = true;
  if (annee) {
    await fetchClasseByAnneeAndProf(1, 1);
    await fetchApsaRetenuByAnneeAndEtablissement(1, 1);
    await fetchCriteres();
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
</script>
