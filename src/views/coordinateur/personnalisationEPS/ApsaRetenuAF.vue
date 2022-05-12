<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
    <EnTetePersonalisation />
    <div class="container-fluid">
      <div id="mesClasses">
        <div class="row">
          <div class="d-flex p-2">
            <strong>Sélectionner le niveau scolaire concerné :</strong>
          </div>
          <SelectButton
            v-model="niveauScolaireSelectionne"
            :options="etablissement.niveauScolaire"
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
          :disabled="checkIfCaHasNotApsaSelect(ca)"
          @click="selectionnerCa(ca)"
        />
        <div v-if="selectedCa && niveauScolaireSelectionne">
          <div class="row">
            <div class="d-flex p-2">
              <strong>Sélectionner les attendus finaux retenus :</strong>
            </div>
            <div v-for="af of listeAf" :key="af.id" class="field-checkbox">
              <Checkbox
                :id="af.id"
                name="af"
                :value="af"
                v-model="selectedAfs"
                dataKey="id"
                style="margin-bottom: 0.5rem"
              />
              <label style="margin: 0.5rem" :for="af.id.toString()">{{ af.libelle }}</label>
            </div>
          </div>
          <div class="d-flex p-2">
            <Button label="Valider" style="right: 1rem" icon="pi pi-check" @click="ajouterAfsRetenus()" autofocus />
            <InlineMessage v-if="afEnErreur" severity="error"
              >Vous devez sélectionner au moins 1 attendu final
            </InlineMessage>
          </div>
        </div>
        <InlineMessage v-else severity="info">
          Veuillez sélectionner un niveau scolaire et un champ d'apprentissage
        </InlineMessage>
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
import { ref, onMounted, watch, toRaw } from 'vue';
import type { AF, ApsaSelectAnnee, ChampApprentissage, NiveauScolaire } from '@/models';
import AfService from '@/services/AfService';
import ChampApprentissageService from '@/services/ChampApprentissageService';
import UtilisateurService from '@/services/UtilisateurService';
import afRetenuService from '@/services/AfRetenusService';
import ChoixAnneeService from '@/services/ChoixAnneeService';
import { useRoute, useRouter } from 'vue-router';
import ApsaSelectAnneeService from '@/services/ApsaSelectAnneeService';
import EnTetePersonalisation from './EnTetePersonalisation.vue';
import ObjectUtils from '@/utils/ObjectUtils';
import UserService from '@/services/UserService';

const { isObjectEmpty } = ObjectUtils();
const { user, redirectToHomePage } = UserService();
const route = useRoute();
const router = useRouter();

const { apsaSelectAnneeByAnnee, fetchAllApsaSelectAnneeByAnnee } = ApsaSelectAnneeService();
const { saveChoixAnnee, choixAnnee, saveAfRetenuInChoixAnnee } = ChoixAnneeService();
const { saveAfRetenu, fetchAllAfRetenuByAnneeAndNiveauScolaire, afRetenuByAnneeAndNiveauScolaire } = afRetenuService();
const { afs, fetchAllAfs } = AfService();
const { champsApprentissages, fetchChampsApprentissages } = ChampApprentissageService();
const { etablissement, anneeEnConfig } = UtilisateurService();

const listeAf = ref<AF[]>([]);
const selectedCa = ref<ChampApprentissage>();
const selectedAfs = ref<AF[]>([]);
const niveauScolaireSelectionne = ref<NiveauScolaire>();
const isLoading = ref(false);

//Gestion des erreurs
const afEnErreur = ref(false);

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (user.value.roles != 'Admin') {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    await fetchChampsApprentissages();
    await fetchAllAfs();
    await fetchAllApsaSelectAnneeByAnnee(anneeEnConfig.value.id);
    isLoading.value = false;
    if (route.query.idNiveau) {
      niveauScolaireSelectionne.value = etablissement.value.niveauScolaire.find(
        (n) => n.id == parseInt(route.query.idNiveau!.toString())
      );
    }
    if (route.query.idCa) {
      selectedCa.value = champsApprentissages.value.find((ca) => ca.id == parseInt(route.query.idCa!.toString()));
    }
  }
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
  () => selectedCa.value,
  (ca) => {
    selectedAfs.value = [];
    if (ca && niveauScolaireSelectionne.value)
      listeAf.value = getAfsByTypeAndCa(niveauScolaireSelectionne.value.typeAf, ca['@id']);
    if (ca && checkIfCaHasAfRetenu(ca)) {
      selectedAfs.value = afRetenuByAnneeAndNiveauScolaire.value
        .filter((afRetenu) => afRetenu.ChoixAnnee.champApprentissage.id === selectedCa.value?.id)
        .map((afR) => {
          return {
            '@id': afR.Af['@id'],
            id: afR.Af.id,
            libelle: afR.Af.libelle,
          } as AF;
        });
    }
  }
);

watch(
  () => niveauScolaireSelectionne.value,
  async () => {
    if (niveauScolaireSelectionne.value) {
      isLoading.value = true;
      selectedAfs.value = [];
      await fetchAllAfRetenuByAnneeAndNiveauScolaire(anneeEnConfig.value.id, niveauScolaireSelectionne.value.id);
      if (selectedCa.value) {
        if (checkIfCaHasNotApsaSelect(selectedCa.value)) {
          selectedCa.value = {} as ChampApprentissage;
        } else {
          listeAf.value = getAfsByTypeAndCa(niveauScolaireSelectionne.value.typeAf, selectedCa.value['@id']);
          if (checkIfCaHasAfRetenu(selectedCa.value)) {
            selectedAfs.value = afRetenuByAnneeAndNiveauScolaire.value
              .filter((afRetenu) => afRetenu.ChoixAnnee.champApprentissage.id === selectedCa.value?.id)
              .map((afR) => {
                return {
                  '@id': afR.Af['@id'],
                  id: afR.Af.id,
                  libelle: afR.Af.libelle,
                } as AF;
              });
          }
        }
      }
      isLoading.value = false;
    }
  }
);

function getAfsByTypeAndCa(type_af: string, id_ca: string): AF[] {
  return afs.value
    .filter((af) => af.typeAf === type_af && af.ca === id_ca)
    .map((af) => {
      return {
        '@id': af['@id'],
        id: af.id,
        libelle: af.libelle,
      } as AF;
    });
}

function checkIfCaHasNotApsaSelect(ca: ChampApprentissage) {
  if (!apsaSelectAnneeByAnnee.value.find((monAPSASelect) => ca.id === monAPSASelect.Ca.id)) {
    return true;
  }
  return false;
}

function checkIfCaHasAfRetenu(ca: ChampApprentissage) {
  if (
    ca &&
    afRetenuByAnneeAndNiveauScolaire.value.find((afRetenu) => afRetenu.ChoixAnnee.champApprentissage.id === ca.id)
  ) {
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
  if (!verifFormulaire()) {
    //Edit
    if (checkIfCaHasAfRetenu(selectedCa.value!)) {
      const afR = afRetenuByAnneeAndNiveauScolaire.value.find(
        (afRetenu) => afRetenu.ChoixAnnee.champApprentissage.id === selectedCa.value!.id
      );
      const idsAfForRequest = selectedAfs.value.map((af) => {
        return { Af: af.id };
      });
      await saveAfRetenuInChoixAnnee(afR!.ChoixAnnee.id, idsAfForRequest);
    } else {
      // Create
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
    }
    router.push({
      name: 'DeclinerAFRetenus',
      query: { idChoixAnnee: choixAnnee.value.id, idCA: selectedCa.value?.id },
    });
  }
}
</script>
