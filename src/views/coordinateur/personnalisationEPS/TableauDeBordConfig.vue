<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
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
          @change="onAnneeEnConfigChange()"
        />
      </div>
      <div class="row">
        <div class="col">
          <strong>APSA :</strong><br />
          <span v-for="idCa in 5" :key="idCa">CA{{ idCa }}: {{ getStringApsaByIdCa(idCa) }}<br /></span>
        </div>
      </div>

      <div>
        <p>Filtrer la configuration par niveau scolaire :</p>
        <Dropdown
          v-model="niveauScolaireSelectionne"
          :options="etablissement.niveauScolaire"
          optionLabel="libelle"
          dataKey="id"
          placeholder="Tous"
          :showClear="true"
        />
      </div>

      <DataTable :value="choixAnneeFiltree" v-model:expandedRows="expandedRows" dataKey="id" responsiveLayout="scroll"
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
      <DataTable
        :value="apsasRetenusFiltree"
        v-model:expandedRows="expandedRowsApsaRetenu"
        dataKey="id"
        responsiveLayout="scroll"
        :paginator="true"
        :rows="5"
      >
        <template #header> Situations d'évaluations </template>
        <Column :expander="true" headerStyle="width: 3rem" />
        <Column :field="(item: ApsaRetenu) => 'CA' + item.AfRetenu.ChoixAnnee.champApprentissage.id" header="CA" />
        <Column field="ApsaSelectAnnee.Apsa.libelle" header="APSA" />
        <Column field="AfRetenu.Af.libelle" header="AF" />
        <Column field="SituationEvaluation" header="Situation d'évaluation" />
        <Column headerStyle="width:4rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              @click="
                router.push({
                  name: 'DeclinerAFRetenus',
                  query: {
                    idChoixAnnee: slotProps.data.AfRetenu.ChoixAnnee.id,
                    idCA: slotProps.data.AfRetenu.ChoixAnnee.champApprentissage.id,
                    idApsa: slotProps.data.ApsaSelectAnnee.Apsa.id,
                    idAfRetenu: slotProps.data.AfRetenu.id,
                  },
                })
              "
            />
          </template>
        </Column>
        <template #expansion="slotProps">
          <DataTable
            :value="slotProps.data.criteres"
            v-model:expandedRows="expandedRowsCritere"
            dataKey="id"
            responsiveLayout="scroll"
          >
            <template #header> Critères </template>
            <Column :expander="true" headerStyle="width: 3rem" />
            <Column field="titre" header="Titre">
              <template #body="slotProps"> <span v-html="slotProps.data.titre"></span> </template>
            </Column>
            <Column field="description" header="Description">
              <template #body="slotProps"> <span v-html="slotProps.data.description"></span> </template>
            </Column>
            <Column headerStyle="width:4rem">
              <template #body="slotProps">
                <Button
                  icon="pi pi-pencil"
                  @click="
                    router.push({
                      name: 'Critere',
                      query: { idApsaRetenu: slotProps.data.ApsaRetenu.id },
                    })
                  "
                />
              </template>
            </Column>
            <template #expansion="slotProps">
              <DataTable :value="slotProps.data.Indicateur" responsiveLayout="scroll">
                <template #header> Indicateurs </template>

                <Column field="libelle" header="Titre">
                  <template #body="slotProps"> <span v-html="slotProps.data.libelle"></span> </template
                ></Column>

                <Column field="description" header="Description">
                  <template #body="slotProps"> <span v-html="slotProps.data.description"></span> </template>
                </Column>
              </DataTable>
            </template>
          </DataTable>
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
import { ref, onMounted, computed } from 'vue';
import type { Annee, NiveauScolaire, ChoixAnnee, ApsaRetenu } from '@/models';
import UtilisateurService from '@/services/UtilisateurService';
import AnneeService from '@/services/AnneeService';
import ApsaSelectAnneeService from '@/services/ApsaSelectAnneeService';
import ChoixAnneeService from '@/services/ChoixAnneeService';
import ApsaRetenuService from '@/services/ApsaRetenuService';
import ObjectUtils from '@/utils/ObjectUtils';
import { useRoute, useRouter } from 'vue-router';
import UserService from '@/services/UserService';
import Role from '@/constants/Role';

const { user, redirectToHomePage } = UserService();
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
const { annees, fetchAllAnnees, annee, fetchAnneeById } = AnneeService();
const { apsaSelectAnneeByAnnee, fetchAllApsaSelectAnneeByAnnee } = ApsaSelectAnneeService();
const { fetchAllChoixAnneeByAnneeAndEtablissement, choixAnneeByAnneeAndEtablissement } = ChoixAnneeService();
const { fetchApsaRetenuByAnneeAndEtablissement, apsasRetenusByEtablissementAndAnnee } = ApsaRetenuService();
// Contrôle l'affichage du menu. Par défaut, est vrai si l'écran n'est pas un mobile, faux sinon.
const displayMenu = ref(window.innerWidth >= 600);
const expandedRows = ref([]);
const expandedRowsApsaRetenu = ref([]);
const expandedRowsCritere = ref([]);
const nouvelAnneeEnConfig = ref<Annee>(anneeEnConfig.value);
const niveauScolaireSelectionne = ref<NiveauScolaire>();
const isLoading = ref(false);

const choixAnneeFiltree = computed((): ChoixAnnee[] => {
  if (!niveauScolaireSelectionne.value) {
    return choixAnneeByAnneeAndEtablissement.value;
  } else {
    return choixAnneeByAnneeAndEtablissement.value.filter((c) => c.Niveau.id === niveauScolaireSelectionne.value?.id);
  }
});
const apsasRetenusFiltree = computed((): ApsaRetenu[] => {
  if (!niveauScolaireSelectionne.value) {
    console.log('niveau scolaire non filter', apsasRetenusByEtablissementAndAnnee.value);
    return apsasRetenusByEtablissementAndAnnee.value;
  } else {
    console.log('niveau scolaire filter');

    return apsasRetenusByEtablissementAndAnnee.value.filter(
      (ar) => ar.AfRetenu.ChoixAnnee.Niveau.id === niveauScolaireSelectionne.value?.id
    );
  }
});

onMounted(async () => {
  console.log('onMonted Tableau de bord', isObjectEmpty(user.value), user.value.roles.includes(Role.ADMIN));
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (!user.value.roles.includes(Role.ADMIN)) {
    //redirectToHomePage();
  } else {
    isLoading.value = true;
    await fetchAllAnnees();
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
    await fetchConfigAnnee();
    isLoading.value = false;
  }
});

async function fetchConfigAnnee() {
  isLoading.value = true;

  await fetchAllApsaSelectAnneeByAnnee(nouvelAnneeEnConfig.value.id);
  await fetchAllChoixAnneeByAnneeAndEtablissement(nouvelAnneeEnConfig.value.id, etablissement.value.id);
  await fetchApsaRetenuByAnneeAndEtablissement(anneeEnConfig.value.id, etablissement.value.id);
  console.log('on monted', apsasRetenusByEtablissementAndAnnee.value);
  isLoading.value = false;
}

function getStringApsaByIdCa(idCa: number) {
  return apsaSelectAnneeByAnnee.value
    .filter((asaba) => asaba.Ca.id === idCa)
    .map((e) => e.Apsa.libelle)
    .join(', ');
}

async function onAnneeEnConfigChange() {
  await storeAnneeEnConfig(nouvelAnneeEnConfig.value);
  await fetchConfigAnnee();
}
</script>
