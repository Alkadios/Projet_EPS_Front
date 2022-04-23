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
                      :options="classesByProfesseur"
                      optionLabel="classe.libelleClasse"
                      optionValue="classe.id"
                      placeholder="Ma Classe"
                      @change="maClasse()"
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
                      :options="apsaSelectAnneeByAnneeAndClasse"
                      optionLabel="Apsa.libelle"
                      optionValue="Apsa.id"
                      placeholder="Ma Classe"
                      @change="maClasse()"
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
                    :options="elevesByClasse"
                    :filter="true"
                    optionLabel="nom"
                    listStyle="max-height:250px"
                    style="width: 100%; overflow-y: scroll; max-height: 380px"
                    filterPlaceholder="Search"
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
    </div>
    <div style="position: fixed; bottom: 0; right: 2rem">
      <ProgressSpinner
        v-if="isLoading"
        style="float: right; width: 50px; height: 50px"
        strokeWidth="8"
        animationDuration=".5s"
      />
    </div>
  </div>
  <div class="mb-3">
    <button @click="maClasse">TEST</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import UtilisateurService from '@/services/UtilisateurService';
import ApsaSelectAnneeService from '@/services/ApsaSelectAnneeService';
import ProfesseurClassesService from '@/services/ProfesseurClassesService';
import EleveService from '@/services/EleveService';
const { fetchAllApsaSelectAnneeByAnneeAndClasse, apsaSelectAnneeByAnneeAndClasse } = ApsaSelectAnneeService();
const { fetchElevesByClasse, elevesByClasse } = EleveService();
const { classesByProfesseur, fetchClassesByProfesseur } = ProfesseurClassesService();
const mySearch = ref();
const { etablissement, annee } = UtilisateurService();
const isLoading = ref(false);

const filteredProduct = ref(classesByProfesseur.value);
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
]);

const mesIndicateurs = ref([
  { name: 'Test non réalisé', code: '0' },
  { name: 'Maitrise insuffisante', code: '1' },
  { name: 'Maitrise fragile', code: '2' },
  { name: 'Maitrise satisfaisante', code: '3' },
  { name: 'Très bonne maitrise', code: '4' },
]);

const maClasseSelect = ref();
const monSportSelect = ref();
const monEleveSelect = ref();

function filterTable() {
  if (mySearch.value) {
    filteredProduct.value = classesByProfesseur.value.filter((data) =>
      data.classe.libelleClasse.includes(mySearch.value)
    );
  } else {
    filteredProduct.value = classesByProfesseur.value;
  }
}

async function maClasse() {}

onMounted(async () => {
  isLoading.value = true;
  if (annee) {
    await fetchClassesByProfesseur(1);
  }
  isLoading.value = false;
});

watch(
  () => maClasseSelect.value,
  async () => {
    if (maClasseSelect.value) {
      isLoading.value = true;
      await fetchAllApsaSelectAnneeByAnneeAndClasse(annee.value.id, maClasseSelect.value);
      await fetchElevesByClasse(maClasseSelect.value);
      isLoading.value = false;
      console.log('apsaSelectAnneeByAnneeAndClasse : ', apsaSelectAnneeByAnneeAndClasse.value);
      console.log('elevesByClasse : ', elevesByClasse.value);
    }
  }
);
</script>
