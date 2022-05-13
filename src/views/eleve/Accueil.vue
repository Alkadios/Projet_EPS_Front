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
              <div id="EvaluationClasse" class="col-md-5">
                <div class="d-flex justify-content-center">
                  <div v-for="classe in eleveById.classe" :key="classe.id">
                    <div>{{ classe.Annee.annee }} : {{ classe.libelleClasse }}</div>
                    <span v-for="sport in listeApsaByAnnee?.filter((s) => s.id_classe === classe.id)" :key="sport.id">
                      <Button
                        :label="sport.libelle_apsa"
                        @click="
                          router.push({
                            name: 'EvaluationEleve',
                            params: {
                              etablissement: sport.id_etablissement,
                              apsa: sport.id_apsa,
                              annee: sport.id_annee,
                            },
                          })
                        "
                      />

                      {{ sport.libelle_annee + ' ' + sport.libelle_apsa + ' ' + sport.libelle_classe }}
                    </span>
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
        <Button label="Annuler" @click="router.push('TableauDeBordConfig')"></Button>
        <Button label="Terminer l'évaluation" icon="pi pi-check" style="left: 1rem"></Button>
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

const { fetchEleveByUser, eleveByUser } = EleveService();
const { isObjectEmpty } = ObjectUtils();
const { user, redirectToHomePage } = UserService();
const route = useRoute();
const router = useRouter();

const { fetchAllApsaSelectAnneeByAnnee, apsaSelectAnneeByAnnee } = ApsaSelectAnneeService();
const { etablissement } = UtilisateurService();
const { fetchEleveById, eleveById, apsaEvaluateByEleve, fetchAllApsaEvaluateByEleve } = EleveService();
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
  } else if (user.value.roles != 'Eleve') {
    redirectToHomePage();
  } else {
    isLoading.value = true;
  }
  await fetchEleveById(7);
  await fetchAllApsaEvaluateByEleve(7);

  console.log('onMounted', eleveById.value.classe, listeApsaByAnnee.value);
  console.log(apsaEvaluateByEleve.value.filter((s) => s.id_classe == 10));
  isLoading.value = false;
});

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
