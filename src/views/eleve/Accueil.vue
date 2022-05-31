<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div id="ContentScreen" class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2">Bienvenue sur O.C.P.E.P.S</p>
              <h4 class="text-dark mb-4">{{ etablissement.nom }}</h4>
            </div>
          </div>
          <div id="mesClasses">
            <div class="row">
              <div id="EvaluationClasse">
                <div>
                  <div
                    class="d-flex flex-column"
                    style="margin-bottom: 2rem"
                    v-for="classe in eleveById.classe"
                    :key="classe.id"
                  >
                    <div>{{ classe.etablissement.nom }}</div>
                    <div>{{ classe.Annee.annee }} : {{ classe.libelleClasse }}</div>
                    <div class="justify-content-around">
                      <div
                        v-for="sport in apsaEvaluateByEleve?.filter(
                          (s) =>
                            s.libelle_annee == classe.Annee.annee &&
                            s.nom_etablissement == classe.etablissement.nom &&
                            s.libelle_classe == classe.libelleClasse
                        )"
                        :key="sport.id"
                      >
                        <Button
                          :label="sport.libelle_apsa"
                          @click="toEvaluationEleve(sport.id_etablissement, sport.id_apsa, sport.id_annne)"
                        />
                      </div>
                    </div>

                    <!-- <div v-for="sport in mesAPSAbyAnnee(classe.Annee.id)" :key="sport.length">
                      <div>{{ sport.length }}</div>
                    </div> -->
                    <!-- <div v-for="apsaEvaluate of listeApsaByAnnee 
" :key="apsaEvaluate.id" class="field-checkbox">
          
        </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 ms-3">
        <Button label="Annuler" @click="test()"></Button>
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
import { ref, onMounted, watch, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UtilisateurService from '@/services/UtilisateurService';
import ApsaSelectAnneeService from '@/services/ApsaSelectAnneeService';
import ObjectUtils from '@/utils/ObjectUtils';
import type { Eleve, APSA } from '@/models';
import UserService from '@/services/UserService';
import EleveService from '@/services/EleveService';
import Role from '@/constants/Role';
import internal from 'stream';

const { fetchEleveByUser, eleveByUser } = EleveService();
const { isObjectEmpty } = ObjectUtils();
const { user, redirectToHomePage } = UserService();
const route = useRoute();
const router = useRouter();

const { etablissement } = UtilisateurService();
const { fetchEleveById, eleveById, fetchAllApsaEvaluateByEleve, apsaEvaluateByEleve } = EleveService();
const isLoading = ref(false);

interface customApsa {
  id: number;
  id_annee: number;
  libelle_annee: string;
  id_apsa: number;
  libelle_apsa: string;
  id_classe: number;
  libelle_classe: string;
  id_etablissement: number;
  nom_etablissement: string;
}

const listeApsaByAnnee = ref<customApsa[]>();
const listeShow = ref();

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (!user.value.roles.includes(Role.ELEVE)) {
    redirectToHomePage();
  } else {
    isLoading.value = true;
  }
  await fetchEleveById(7);
  await fetchAllApsaEvaluateByEleve(7);
  isLoading.value = false;
});

function test() {
  console.log('eleveById : ', eleveById.value);
  console.log('apsaEvaluateByEleve : ', apsaEvaluateByEleve.value);
}

function toEvaluationEleve(idEtablissement: number, idApsa: number, idAnnee: number) {
  router.push({
    name: 'EvaluationEleve',
    query: {
      etablissement: idEtablissement,
      apsa: idApsa,
      annee: idAnnee,
    },
  });
  console.log('test');
}

async function mesAPSAbyAnnee(idAnnee: number) {
  isLoading.value = true;
  // await fetchAllApsaSelectAnneeByAnnee(idAnnee);
  // const mesAPSA = ref<APSA[]>([]);
  // apsaSelectAnneeByAnnee.value.forEach((asa) => {
  //   if (asa.apsaRetenus.length > 0) {
  //     asa.apsaRetenus.forEach((ar) => {
  //       if (ar.AfRetenu.ChoixAnnee.Niveau === '/api/niveau_scolaires/1') {
  //         mesAPSA.value.push(asa.Apsa);
  //       }
  //     });
  //   }
  // });
  // isLoading.value = false;
  // return mesAPSA.value;
}
</script>
