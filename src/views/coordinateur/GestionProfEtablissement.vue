<template>
  <Dropdown
    v-model="selectedEtablissement"
    :options="etablissements"
    optionLabel="nom"
    dataKey="id"
    placeholder="Selectionner un Etablissement"
    @change="onEtablissementChange"
  />

  <div>
    <div>
      <Button label="Ajouter des profs" @click="openBasic" style="right: 1rem" icon="pi pi-plus" autofocus />
      <Button
        label="Retirer les Profs"
        @click="deleteFromEtablissement(selectedEtablissement?.id)"
        style="right: 1rem"
        icon="pi pi-trash"
        autofocus
      />
    </div>
    <DataTable
      :value="mesProfs"
      v-model:selection="selectedProfesseurOnEtablissement"
      responsiveLayout="scroll"
      dataKey="id"
    >
      <Column selectionMode="multiple"></Column>

      <Column field="nom" header="nom" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="prenom" header="prenom" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="telephone" header="telephone" :sortable="true" style="min-width: 12rem"></Column>
    </DataTable>
    <div style="position: fixed; bottom: 0; right: 2rem">
      <ProgressSpinner
        v-if="isLoading"
        style="float: right; width: 50px; height: 50px"
        strokeWidth="8"
        animationDuration=".5s"
      />
    </div>
  </div>

  <Dialog header="Ajouter un Profs" v-model:visible="displayBasic" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #content>
            <DataTable
              :value="mesProfsSansEtablissement"
              v-model:selection="selectedProfs"
              responsiveLayout="scroll"
              dataKey="id"
            >
              <Column selectionMode="multiple"></Column>
              <Column field="nom" header="nom" :sortable="true" style="min-width: 12rem"></Column>
              <Column field="prenom" header="prenom" :sortable="true" style="min-width: 12rem"></Column>
              <Column field="telephone" header="telephone" :sortable="true" style="min-width: 12rem"></Column>
              <Column field="mailParent1" header="mailParent1" :sortable="true" style="min-width: 12rem"></Column>
              <Column field="mailParent2" header="mailParent2" :sortable="true" style="min-width: 12rem"></Column>
              <Column :exportable="false" style="min-width: 8rem">
                <template>
                  <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" />
                  <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" />
                </template>
              </Column>
            </DataTable>
            <button type="button" class="btn btn-primary" @click="editEtablissement(selectedEtablissement?.id)">
              Ajouter
            </button>
          </template>
        </Card>
      </div>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" autofocus />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { Classe, Eleve, Etablissement, Professeur } from '@/models';
import ClasseService from '@/services/ClasseService';
import EleveService from '@/services/EleveService';
import EtablissementService from '@/services/EtablissementService';
import ProfesseurService from '@/services/ProfesseurService';
import UtilisateurService from '@/services/UtilisateurService';
import eleve from '@/store/modules/eleve';
import { ref, onMounted, toRaw } from 'vue';

const { fetchAllEtablissements, etablissements, putEtablissementProfs } = EtablissementService();
const { fetchAllProfs, professeurs } = ProfesseurService();

onMounted(async () => {
  isLoading.value = true;
  await fetchAllEtablissements();
  await fetchAllProfs();
  isLoading.value = false;
});

function mesProfsByEtablissement(idEtablissement: number) {
  mesProfs.value = etablissements.value.find((a) => a.id === idEtablissement)!.Professeur;
  console.log('mesprofs', mesProfs.value);
}
const closeBasic = () => {
  displayBasic.value = false;
};

const mesProfs = ref<Professeur[]>([]);
const eleveDialog = ref(false);
const selectedEtablissement = ref<Etablissement>();
const selectedProfs = ref<Professeur[]>();
const selectedProfesseurOnEtablissement = ref<Professeur[]>();
const mesProfsSansEtablissement = ref<Professeur[]>([]);
const displayBasic = ref(false);
const isLoading = ref(false);
const openBasic = () => {
  displayBasic.value = true;
  filterProfsSansEtablissement();
};

function filterProfsSansEtablissement() {
  mesProfsSansEtablissement.value = professeurs.value.filter((p) => p.etablissements.length == 0);
  isLoading.value = false;
}

function onEtablissementChange() {
  if (selectedEtablissement.value) {
    mesProfsByEtablissement(selectedEtablissement.value.id);
  }
}

async function editEtablissement(idEtablissement: number) {
  if (confirm('Voulez vous vraiment ajouter ces professeurs à cette etablissement')) {
    const idsProfsExistants = mesProfs.value.map((p: Professeur) => {
      return p['@id'];
    });
    if (selectedProfs.value) {
      const idsProfs = selectedProfs.value.map((p: Professeur) => {
        return p['@id'];
      });
      const arrayidProf = idsProfsExistants.concat(idsProfs);

      if (idsProfs) await putEtablissementProfs(idEtablissement, arrayidProf);
    }

    alert('Vos professeurs ont été ajouté à cette établissement');
    eleveDialog.value = false;
    isLoading.value = true;
    mesProfsByEtablissement(idEtablissement);
    onEtablissementChange();
    isLoading.value = false;
  }
}

async function deleteFromEtablissement(idEtablissement: number) {
  if (confirm('Voulez vous vraiment retirer ces professeurs de cette etablissement?')) {
    const idProfsRetirer = mesProfs.value
      .filter((e) => selectedProfesseurOnEtablissement.value?.findIndex((ec) => ec.id === e.id) === -1)
      .map((e) => {
        return toRaw(e['@id']);
      });
    await putEtablissementProfs(idEtablissement, idProfsRetirer);
    alert('Vos professeurs ont été à cette établissement');
    mesProfsByEtablissement(idEtablissement);
  }
}
</script>
