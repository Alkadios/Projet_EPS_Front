<template>
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
</template>

<script lang="ts" setup>
import UtilisateurService from '@/services/UtilisateurService';
const { etablissement } = UtilisateurService();
</script>
