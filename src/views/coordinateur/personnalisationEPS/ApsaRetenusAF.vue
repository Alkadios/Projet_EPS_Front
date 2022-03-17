<template>
  <div class="card shadow-lg o-hidden border-0 my-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2">
                Personnalisation de l'équipe EPS <br />
                au
              </p>
              <h4 class="text-dark mb-4">{{ NomEtablissement }}</h4>
            </div>
            <p>Sélectionner les AF retenus :</p>
          </div>
        </div>
        <div class="mb-3">
          <div v-for="af of afs" :key="af.id" class="field-checkbox">
            <Checkbox
              :id="af.id"
              name="category"
              :value="af"
              style="margin-bottom: 0.5rem"
              v-model="selectedCategories"
            />
            <label style="margin: 0.5rem" :for="af.id.toString()">{{ af.libelle }}</label>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <Button
          label="Valider"
          style="right: 1rem"
          icon="pi pi-check"
          @click="verif(), $router.push('DeclinerAFRetenus')"
          autofocus
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { AF } from '@/models';
import AfService from '@/services/AfService';

const { afs, fetchAllAfs } = AfService();
const categories = ref([
  { name: 'Accounting', key: 'A' },
  { name: 'Marketing', key: 'M' },
  { name: 'Production', key: 'P' },
  { name: 'Research', key: 'R' },
]);

const selectedCategories = ref([]);

const NomEtablissement = 'Lycée Professionnel de St Joseph';

onMounted(async () => {
  await fetchAllAfs();
});

function verif() {
  console.log(selectedCategories.value);
}
</script>
