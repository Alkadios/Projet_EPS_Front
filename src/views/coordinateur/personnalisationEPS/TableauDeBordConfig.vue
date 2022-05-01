<template>
  <div class="card shadow-lg o-hidden border-0 my-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2">
                Tableau de bord de la configuration <br />
                au
              </p>
              <h4 class="text-dark mb-4">{{ etablissement.nom }}</h4>
            </div>
          </div>
        </div>
        <div class="mb-3"></div>
      </div>
    </div>
    <div class="mb-3">
      <div>
        <p>Configuration de la promotion :</p>
        <Dropdown
          v-model="nouvelAnneeEnConfig"
          :options="annees"
          optionLabel="annee"
          dataKey="id"
          @change="storeAnneeEnConfig(nouvelAnneeEnConfig)"
        />
      </div>
      <div class="row">
        <div class="col">
          <strong>APSA :</strong><br />
          <span v-for="idCa in 5" :key="idCa">CA{{ idCa }}: {{ getStringApsaByIdCa(idCa) }}<br /></span>
        </div>
      </div>

      <div>
        <p>Niveau scolaire :</p>
        <Dropdown
          v-model="niveauScolaireSelectionne"
          :options="etablissement.niveauScolaire"
          optionLabel="libelle"
          dataKey="id"
        />
      </div>

      <DataTable
        :value="choixAnneeByAnneeAndEtablissement"
        v-model:expandedRows="expandedRows"
        dataKey="id"
        responsiveLayout="scroll"
        ><Column :expander="true" headerStyle="width: 3rem" />
        <Column field="Niveau.libelle" header="Niveau scolaire"></Column>

        <Column
          :field="(item: ChoixAnnee) =>'CA'+ item.id + ' - ' + item.champApprentissage.libelle"
          header="CA"
        ></Column>
        <Column headerStyle="width:4rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              @click="
                router.push({
                  name: 'ApsaRetenuAF',
                  query: { idNiveau: slotProps.data.Niveau.id, idCa: slotProps.data.champApprentissage.id },
                })
              "
            />
          </template>
        </Column>
        <template #expansion="slotProps">
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th class="text-dark">Attendus finaux</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="afRetenu in slotProps.data.afRetenus" :key="afRetenu.id">
                  <td>{{ afRetenu.Af.libelle }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </DataTable>
    </div>
    <div class="mb-3">
      <Button label="Valider" style="right: 1rem" icon="pi pi-check" autofocus></Button>
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
import { ref, onMounted } from 'vue';
import { Annee, NiveauScolaire, ChoixAnnee } from '@/models';
import UtilisateurService from '@/services/UtilisateurService';
import AnneeService from '@/services/AnneeService';
import ApsaSelectAnneeService from '@/services/ApsaSelectAnneeService';
import ChoixAnneeService from '@/services/ChoixAnneeService';
import ObjectUtils from '@/utils/ObjectUtils';
import { useRoute, useRouter } from 'vue-router';

//const router = useRouter();

const { isObjectEmpty } = ObjectUtils();
const route = useRoute();
const router = useRouter();

const {
  utilisateur,
  logoutUtilisateur,
  etablissement,
  anneeEnConfig,
  storeAnneeEnConfig,
  fetchAnneeEnCours,
  anneeEnCours,
} = UtilisateurService();
const { annees, fetchAllAnnee, annee, fetchAnneeById } = AnneeService();
const { apsaSelectAnneeByAnnee, fetchAllApsaSelectAnneeByAnnee } = ApsaSelectAnneeService();
const { fetchAllChoixAnneeByAnneeAndEtablissement, choixAnneeByAnneeAndEtablissement } = ChoixAnneeService();
// Contrôle l'affichage du menu. Par défaut, est vrai si l'écran n'est pas un mobile, faux sinon.
const displayMenu = ref(window.innerWidth >= 600);
const expandedRows = ref([]);
const nouvelAnneeEnConfig = ref<Annee>(anneeEnConfig.value);
const niveauScolaireSelectionne = ref<NiveauScolaire>();
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await fetchAllAnnee();
  if (isObjectEmpty(nouvelAnneeEnConfig.value)) {
    const anneeLocal = localStorage.getItem('anneeEnConfig');
    if (anneeLocal != undefined && anneeLocal != null) {
      await fetchAnneeById(parseInt(anneeLocal));
      storeAnneeEnConfig(annee.value);
    } else {
      await fetchAnneeEnCours();
      storeAnneeEnConfig(anneeEnCours.value);
    }
    nouvelAnneeEnConfig.value = anneeEnConfig.value;
  }
  fetchConfigAnnee();
  isLoading.value = false;
});

async function fetchConfigAnnee() {
  await fetchAllApsaSelectAnneeByAnnee(nouvelAnneeEnConfig.value.id);
  await fetchAllChoixAnneeByAnneeAndEtablissement(nouvelAnneeEnConfig.value.id, etablissement.value.id);
  console.log('choixAnneeByAnneeAndEtablissement', choixAnneeByAnneeAndEtablissement.value);
}

function getStringApsaByIdCa(idCa: number) {
  return apsaSelectAnneeByAnnee.value
    .filter((asaba) => asaba.Ca.id === idCa)
    .map((e) => e.Apsa.libelle)
    .join(', ');
}
</script>
