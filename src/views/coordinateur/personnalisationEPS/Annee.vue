<template>
  <div class="card shadow-lg o-hidden border-0 my-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-10">
          <div class="p-5" style="padding-bottom: 1rem !important">
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
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="d-flex p-2">
          <strong>Sélectionner une année scolaire :</strong>
        </div>
        <div></div>
      </div>
    </div>
    <div>
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
import { ref, onMounted, watch } from 'vue';
import router from '@/router';
import UtilisateurService from '@/services/UtilisateurService';

const { etablissement, annee } = UtilisateurService();
const isLoading = ref(false);
const displayModal = ref(false);
const annees = ref(['']);

function pushAnnee() {}

console.log(annees);
</script>
