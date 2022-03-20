<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-10">
        <div class="p-4">
          <div class="text-center">
            <p class="text-dark mb-2">
              Personnalisation de l'équipe EPS <br />
              au
            </p>
            <h4 class="text-dark mb-4">{{ etablissement.nomEtablissement }}</h4>
            <p>Sélectionner les AF retenus :</p>
          </div>
        </div>
      </div>

      <div>
        <strong>Sélectionner le niveau scolaire concerné :</strong>
      </div>

      <SelectButton
        v-model="niveauScolaireSelectionne"
        :options="etablissement.niveauxScolaires"
        optionLabel="libelle"
      />

      <div>
        <div>
          <strong>Sélectionner les champs apprentissages concernés :</strong>
        </div>
        <Button
          v-for="ca of champsApprentissages"
          :key="ca.id"
          :label="'CA' + ca.id"
          :style="selectedCa?.id != ca.id ? 'background-color:' + ca.color : ''"
          :class="selectedCa?.id === ca.id ? 'primary' : ''"
          @click="selectionnerCa(ca)"
        />
      </div>
    </div>
    <div class="pt-4">
      <strong>Sélectionner les attendus finaux retenus :</strong>
      <div v-for="af of afs" :key="af.id" class="field-checkbox">
        <Checkbox v-model="selectedAfs" :id="af.id" name="category" :value="af" style="margin-bottom: 0.5rem" />
        <label style="margin: 0.5rem" :for="af.id.toString()">{{ af.libelle }}</label>
      </div>
    </div>
    <div class="pt-3">
      <div v-if="afEnErreur">
        <InlineMessage severity="error"> Le nombre d'attendus finaux sélectionner doit être de 4 </InlineMessage>
      </div>

      <Button label="Valider" style="right: 1rem" icon="pi pi-check" @click="ajouterAfsRetenus()" autofocus />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { AF, ChampApprentissage, NiveauScolaire } from '@/models';
import AfService from '@/services/AfService';
import ChampApprentissageService from '@/services/ChampApprentissageService';
import UtilisateurService from '@/services/UtilisateurService';
import router from '@/router';

const { afs, fetchAllAfs } = AfService();
const { champsApprentissages, fetchChampsApprentissages } = ChampApprentissageService();
const { etablissement } = UtilisateurService();

const selectedCa = ref<ChampApprentissage>();
const selectedAfs = ref([]);
const niveauScolaireSelectionne = ref<NiveauScolaire>();

//Gestion des erreurs
const afEnErreur = ref(false);
const formulaireEnErreur = ref(false);

onMounted(async () => {
  await fetchChampsApprentissages();
  await fetchAllAfs();
});

watch(
  () => selectedAfs.value.length,
  (count) => {
    if (count > 4) {
      afEnErreur.value = true;
    } else afEnErreur.value = false;
  }
);

function selectionnerCa(ca: ChampApprentissage) {
  selectedCa.value = ca;
}
function verifFormulaire(): Boolean {
  let nbErreur = 0;
  if (!selectedCa.value?.id) nbErreur++;
  if (!niveauScolaireSelectionne.value) nbErreur++;
  if (afEnErreur.value || selectedAfs.value.length < 4) {
    afEnErreur.value = true;
    nbErreur++;
  }

  if (nbErreur > 0) return true;
  else return false;
}
function ajouterAfsRetenus() {
  if (!verifFormulaire()) router.push({ name: 'DeclinerAFRetenus' });
}
</script>
