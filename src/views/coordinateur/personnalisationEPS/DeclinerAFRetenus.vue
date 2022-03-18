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
              <h4 class="text-dark mb-4">{{ etablissement.nomEtablissement }}</h4>
            </div>
            <div class="d-flex justify-content-center align-items-center align-content-center">
              <div class="col-3">
                <p class="w-100 m-0">Sélectionner l'APSA :</p>
              </div>
              <div class="col-9">
                <SelectButton v-model="value2" :options="paymentOptions" class="w-100 m-0" optionLabel="name" />
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3"></div>
      </div>
      <div class="mb-3">
        <Textarea class="w-100" :disabled="propertyDisable" v-model="value2" :autoResize="true" rows="5" />
        <Button label="Edit" icon="pi pi-pencil" style="float: right" @click="propertyDisable = !propertyDisable" />
      </div>
    </div>
    <div class="mb-3">
      <Button label="Valider" style="right: 1rem" icon="pi pi-check" @click="verif()" autofocus></Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import UtilisateurService from '@/services/UtilisateurService';

const { etablissement } = UtilisateurService();

let propertyDisable = ref(true);
let monTextarea = ref('Yo le sang');

const value2 = ref('Romain le génie, je le suce !');
const paymentOptions = ref([
  { name: 'Option 1', value: 1 },
  { name: 'Option 2', value: 2 },
  { name: 'Option 3', value: 3 },
]);

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    propertyDisable.value = true;
  }
});

function verif() {
  console.log(propertyDisable);
}
</script>
