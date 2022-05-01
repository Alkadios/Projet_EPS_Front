<template>
  <div class="card shadow-lg o-hidden border-0 my-5">
    <EnTetePersonalisation />
    <div class="container-fluid">
      <div id="mesClasses">
        <div class="row">
          <div class="d-flex p-2">
            <strong>Sélectionner le niveau scolaire concerné :</strong>
          </div>
          <SelectButton
            v-model="niveauScolaireSelectionne"
            :options="etablissement.niveauxScolaires"
            optionLabel="libelle"
          />
          <div class="d-flex p-2">
            <strong>Sélectionner les champs apprentissages concernés :</strong>
          </div>
        </div>
        <Button
          v-for="ca of champsApprentissages"
          :key="ca.id"
          :label="'CA' + ca.id"
          :style="selectedCa?.id != ca.id ? 'background-color:' + ca.color : ''"
          :class="selectedCa?.id === ca.id ? 'primary' : ''"
          :icon="checkIfCaHasAfRetenu(ca) ? 'pi pi-check-circle' : checkIfCaHasNotApsaSelect(ca) ? 'pi pi-times' : ''"
          :disabled="checkIfCaHasAfRetenu(ca) || checkIfCaHasNotApsaSelect(ca)"
          @click="selectionnerCa(ca)"
        />
        <div class="row">
          <div class="d-flex p-2">
            <strong>Sélectionner les attendus finaux retenus :</strong>
          </div>
          <div v-for="af of afs" :key="af.id" class="field-checkbox">
            <Checkbox v-model="selectedAfs" :id="af.id" name="category" :value="af" style="margin-bottom: 0.5rem" />
            <label style="margin: 0.5rem" :for="af.id.toString()">{{ af.libelle }}</label>
          </div>
        </div>
        <div class="d-flex p-2">
          <Button label="Valider" style="right: 1rem" icon="pi pi-check" @click="ajouterAfsRetenus()" autofocus />
          <InlineMessage v-if="afEnErreur" severity="error"
            >Vous devez sélectionner au moins 1 attendu final</InlineMessage
          >
        </div>
      </div>
    </div>
    <div style="position: fixed; bottom: 0; right: 0">
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
import { AF, ApsaSelectAnnee, ChampApprentissage, NiveauScolaire } from '@/models';
import AfService from '@/services/AfService';
import ChampApprentissageService from '@/services/ChampApprentissageService';
import UtilisateurService from '@/services/UtilisateurService';
import afRetenuService from '@/services/AfRetenusService';
import ChoixAnneeService from '@/services/ChoixAnneeService';
import router from '@/router';
import ApsaSelectAnneeService from '@/services/ApsaSelectAnneeService';
import EnTetePersonalisation from './EnTetePersonalisation.vue';

const { apsaSelectAnneeByAnnee, fetchAllApsaSelectAnneeByAnnee } = ApsaSelectAnneeService();
const { saveChoixAnnee, choixAnnee } = ChoixAnneeService();
const { saveAfRetenu, fetchAllAfRetenuByAnneeAndNiveauScolaire, afRetenuByAnneeAndNiveauScolaire } = afRetenuService();
const { afs, fetchAllAfs } = AfService();
const { champsApprentissages, fetchChampsApprentissages } = ChampApprentissageService();
const { etablissement, anneeEnConfig } = UtilisateurService();

const selectedCa = ref<ChampApprentissage>();
const selectedAfs = ref<AF[]>([]);
const niveauScolaireSelectionne = ref<NiveauScolaire>();
const isLoading = ref(false);

//Gestion des erreurs
const afEnErreur = ref(false);
const formulaireEnErreur = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await fetchChampsApprentissages();
  await fetchAllAfs();
  await fetchAllApsaSelectAnneeByAnnee(anneeEnConfig.value.id);
  isLoading.value = false;
});

watch(
  () => selectedAfs.value.length,
  (count) => {
    if (count > 0) {
      afEnErreur.value = false;
    }
  }
);

watch(
  () => niveauScolaireSelectionne.value,
  async () => {
    if (niveauScolaireSelectionne.value) {
      isLoading.value = true;
      await fetchAllAfRetenuByAnneeAndNiveauScolaire(anneeEnConfig.value.id, niveauScolaireSelectionne.value?.id);
      isLoading.value = false;
    }
  }
);

function checkIfCaHasNotApsaSelect(ca: ChampApprentissage) {
  if (!apsaSelectAnneeByAnnee.value.find((monAPSASelect) => ca.id === monAPSASelect.Ca.id)) {
    return true;
  }
  return false;
}

function checkIfCaHasAfRetenu(ca: ChampApprentissage) {
  if (afRetenuByAnneeAndNiveauScolaire.value.find((afRetenu) => afRetenu.ChoixAnnee.champApprentissage.id === ca.id)) {
    return true;
  }
  return false;
}

function selectionnerCa(ca: ChampApprentissage) {
  selectedCa.value = ca;
}
function verifFormulaire(): Boolean {
  let nbErreur = 0;
  if (!selectedCa.value?.id) nbErreur++;
  if (!niveauScolaireSelectionne.value) nbErreur++;
  if (afEnErreur.value || selectedAfs.value.length < 0) {
    afEnErreur.value = true;
    nbErreur++;
  }

  if (nbErreur > 0) return true;
  else return false;
}
async function ajouterAfsRetenus() {
  if (selectedAfs.value.length > 0) {
    if (!verifFormulaire()) {
      let monNiveau = '/api/niveau_scolaires/' + niveauScolaireSelectionne.value?.id;
      await saveChoixAnnee(
        selectedCa.value?.['@id']!,
        monNiveau,
        anneeEnConfig.value['@id'],
        etablissement.value['@id']
      );
      selectedAfs.value.forEach(async (af: AF) => {
        await saveAfRetenu(choixAnnee.value['@id'], af['@id']);
      });
      router.push({
        name: 'DeclinerAFRetenus',
        query: { idChoixAnnee: choixAnnee.value.id, idCA: selectedCa.value?.id },
      });
    }
  } else {
    afEnErreur.value = true;
  }
}
</script>
