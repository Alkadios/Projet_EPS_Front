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
                    <div>{{ classe.NiveauScolaire }}</div>
                    <!-- <div v-for="sport in mesAPSAbyAnnee(classe.Annee.id)" :key="sport.length">
                      <div>{{ sport.length }}</div>
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
import { ref, onMounted, watch } from 'vue';
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
const { fetchEleveById, eleveById } = EleveService();
const isLoading = ref(false);

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (user.value.roles != 'Eleve') {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    await fetchEleveByUser(user.value.id);
    await fetchEleveById(eleveByUser.value.id);
    isLoading.value = false;
  }
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
