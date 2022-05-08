<template>
  <Dropdown
    v-model="selectedClasse"
    :options="classesByAnnee"
    optionLabel="libelleClasse"
    dataKey="id"
    placeholder="Selectionner une classe"
    @change="onClasseChange"
  />

  <div>
    <div>
      <Button label="Ajouter un Eleve" @click="openBasic" style="right: 1rem" icon="pi pi-plus" autofocus />
      <Button
        label="Retirer les Eleves"
        @click="deleteFromClasse(selectedClasse?.id)"
        style="right: 1rem"
        icon="pi pi-trash"
        autofocus
      />
    </div>
    <DataTable :value="mesEleves" v-model:selection="selectedElevesOnClasse" responsiveLayout="scroll" dataKey="id">
      <Column selectionMode="multiple"></Column>

      <Column field="nom" header="nom" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="prenom" header="prenom" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="telephone" header="telephone" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="mailParent1" header="mailParent1" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="mailParent2" header="mailParent2" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="sexeEleve" header="sexeEleve" :sortable="true" style="min-width: 12rem"></Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="champsEleve(slotProps.data.id)"
          />
        </template>
      </Column>
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

  <Dialog header="Ajouter un Eleve" v-model:visible="displayBasic" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #content>
            <DataTable
              :value="mesElevesSansClasse"
              v-model:selection="selectedEleves"
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
            <button type="button" class="btn btn-primary" @click="editClasse(selectedClasse?.id)">Ajouter</button>
          </template>
        </Card>
      </div>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" autofocus />
    </template>
  </Dialog>

  <Dialog header="Modifier un Eleve" v-model:visible="eleveDialog" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #content>
            <center><h1>Modifier un Eleve</h1></center>
            <form>
              <div class="container">
                <div class="row">
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="nom">Nom : </label>
                    <InputText id="nom" v-model="eleveById.nom" required="true" autofocus />
                  </div>
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="prenom">Prenom : </label>
                    <InputText v-model="eleveById.prenom" id="prenom" required="true" autofocus />
                  </div>
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="telephone">Telephone : </label>
                    <InputText id="telephone" v-model="eleveById.telephone" required="true" autofocus />
                  </div>
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="mailParent1">mail Parent 1 : </label>
                    <InputText v-model="eleveById.mailParent1" id="mailParent1" required="true" autofocus />
                  </div>
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="mailParent2">mail Parent 2 : </label>
                    <InputText id="mailParent2" v-model="eleveById.mailParent2" required="true" autofocus />
                  </div>
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="sexeEleve">sexe Eleve : </label>
                    <InputText v-model="eleveById.sexeEleve" id="sexeEleve" required="true" autofocus />
                  </div>
                  <Button class="mt-4" label="Modifier" icon="pi pi-check" @click="editEleve(eleveById.id)" autofocus />
                </div>
              </div>
            </form>
          </template>
        </Card>
      </div>
      <div style="position: fixed; bottom: 0; right: 2rem">
        <ProgressSpinner
          v-if="isLoading"
          style="float: right; width: 50px; height: 50px"
          strokeWidth="8"
          animationDuration=".5s"
        />
      </div>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" autofocus />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { Classe, Eleve } from '@/models';
import ClasseService from '@/services/ClasseService';
import EleveService from '@/services/EleveService';
import UtilisateurService from '@/services/UtilisateurService';
import eleve from '@/store/modules/eleve';
import { ref, onMounted, toRaw } from 'vue';

const isLoading = ref(false);
const { fetchAllEleves, saveEleve, eleves, deleteEleve, fetchEleveById, eleveById, updateEleve } = EleveService();
const { fetchAllClasses, fetchClasseByAnnee, classesByAnnee, addElevesInClasse, classes } = ClasseService();
const { etablissement, anneeEnCours } = UtilisateurService();

onMounted(async () => {
  isLoading.value = true;
  await fetchAllEleves();
  await fetchAllClasses();
  await fetchClasseByAnnee(anneeEnCours.value.id);
  isLoading.value = false;
});

function mesElevesByClasse(idClasse: number) {
  mesEleves.value = classesByAnnee.value.find((a) => a.id === idClasse)!.eleves;
}
const closeBasic = () => {
  displayBasic.value = false;
};
const mesEleves = ref<Eleve[]>([]);
const eleveDialog = ref(false);
const selectedClasse = ref<Classe>();
const selectedEleves = ref<Eleve[]>();
const selectedElevesOnClasse = ref<Eleve[]>();
const mesElevesSansClasse = ref<Eleve[]>([]);
const mesElevesRetirer = ref<Eleve[]>();
const displayBasic = ref(false);
const isLoading = ref(false);
const openBasic = () => {
  displayBasic.value = true;
  filterElevesSansClasse();
};

function filterElevesSansClasse() {
  mesElevesSansClasse.value = eleves.value.filter((e) => e.classe.length == 0);
  isLoading.value = false;
}

function onClasseChange() {
  if (selectedClasse.value) {
    mesElevesByClasse(selectedClasse.value.id);
  }
}

async function champsEleve(idEleve: number) {
  isLoading.value = true;
  eleveDialog.value = true;
  await fetchEleveById(idEleve);
  isLoading.value = false;
}

async function editEleve(idEleve: number) {
  isLoading.value = true;
  await updateEleve(
    idEleve,
    eleveById.value.nom,
    eleveById.value.prenom,
    eleveById.value.mailParent1,
    eleveById.value.mailParent2,
    eleveById.value.telephone,
    eleveById.value.sexeEleve,
    eleveById.value.etablissement
  );
  alert('Votre Eleve à ete modifié');
  eleveDialog.value = false;
  await fetchClasseByAnnee(3);
  onClasseChange();
  isLoading.value = false;
}

async function editClasse(idClasse: number) {
  const idsEleveExistant = mesEleves.value.map((e: Eleve) => {
    return e['@id'];
  });
  if (selectedEleves.value) {
    const idsEleve = selectedEleves.value.map((e: Eleve) => {
      return e['@id'];
    });
    const arrayidEleve = idsEleveExistant.concat(idsEleve);

    if (idsEleve) await addElevesInClasse(idClasse, arrayidEleve);
  }

  alert('Votre Eleve à ete ajouté à cette classe');
  eleveDialog.value = false;
  isLoading.value = true;
  await fetchAllEleves();
  onClasseChange();
  isLoading.value = false;
}

async function deleteFromClasse(idClasse: number) {
  const idElevesRetirer = mesEleves.value
    .filter((e) => selectedElevesOnClasse.value?.findIndex((ec) => ec.id === e.id) === -1)
    .map((e) => {
      return toRaw(e['@id']);
    });
  await addElevesInClasse(idClasse, idElevesRetirer);
  alert('Votre ou vos élèves on été supprimer de cette classe');
}
</script>
