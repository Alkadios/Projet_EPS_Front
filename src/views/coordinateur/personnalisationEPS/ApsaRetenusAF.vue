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
            >Le nombre d'attendus finaux sélectionner doit être de 4</InlineMessage
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { AF, ChampApprentissage, NiveauScolaire, ChoixAnnee } from '@/models';
import AfService from '@/services/AfService';
import ChampApprentissageService from '@/services/ChampApprentissageService';
import UtilisateurService from '@/services/UtilisateurService';
import afRetenuService from '@/services/AfRetenusService';
import ChoixAnneeService from '@/services/ChoixAnneeService';
import router from '@/router';

const { saveChoixAnnee, choixAnnee } = ChoixAnneeService();
const { saveAfRetenu } = afRetenuService();
const { afs, fetchAllAfs } = AfService();
const { champsApprentissages, fetchChampsApprentissages } = ChampApprentissageService();
const { etablissement, annee } = UtilisateurService();

const selectedCa = ref<ChampApprentissage>();
const selectedAfs = ref<AF[]>([]);
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
async function ajouterAfsRetenus() {
  if (!verifFormulaire()) {
    let monNiveau = '/api/niveau_scolaires/' + niveauScolaireSelectionne.value?.id;
    await saveChoixAnnee(selectedCa.value?.['@id']!, monNiveau, annee.value['@id']);
    selectedAfs.value.forEach(async (af: AF) => {
      await saveAfRetenu(choixAnnee.value['@id'], af['@id']);
      console.log("Ajout de l'AF ", af.libelle);
    });
    router.push({ name: 'DeclinerAFRetenus', query: { idCA: selectedCa.value?.id } });
  }
}
</script>
