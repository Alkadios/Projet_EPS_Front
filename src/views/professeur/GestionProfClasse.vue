<template>
  <div>
    <div>
      <Button label="Ajouter ces classes" @click="openBasic" style="right: 1rem" icon="pi pi-plus" autofocus />
      <Button
        label="Retirer les Classes"
        @click="deleteClasseOfProf()"
        style="right: 1rem"
        icon="pi pi-trash"
        autofocus
      />
    </div>
    <DataTable
      :value="classesByAnneeAndProfesseur"
      v-model:selection="selectedClasses"
      dynamic="true"
      responsiveLayout="scroll"
      dataKey="id"
    >
      <Column selectionMode="multiple"></Column>
      <Column field="NiveauScolaire.libelle" header="NiveauScolaire" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="Annee.annee" header="Annee" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="etablissement.nom" header="etablissement" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="libelleClasse" header="libelleClasse" :sortable="true" style="min-width: 12rem"></Column>
      <Column :exportable="false" style="min-width: 8rem"> </Column>
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

  <Dialog header="Ajouter une Classe" v-model:visible="displayBasic" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #content>
            <DataTable
              :value="classesByAnnee"
              v-model:selection="selectedClassesForAdd"
              responsiveLayout="scroll"
              dataKey="id"
            >
              <Column selectionMode="multiple"></Column>
              <Column
                field="NiveauScolaire.libelle"
                header="NiveauScolaire"
                :sortable="true"
                style="min-width: 12rem"
              ></Column>
              <Column field="Annee.annee" header="Annee" :sortable="true" style="min-width: 12rem"></Column>
              <Column
                field="etablissement.nom"
                header="etablissement"
                :sortable="true"
                style="min-width: 12rem"
              ></Column>
              <Column field="libelleClasse" header="libelleClasse" :sortable="true" style="min-width: 12rem"></Column>
              <Column :exportable="false" style="min-width: 8rem"> </Column>
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
</template>

<script lang="ts" setup>
import { Classe, Eleve } from '@/models';
import ClasseService from '@/services/ClasseService';
import ProfesseurService from '@/services/ProfesseurService';
import UserService from '@/services/UserService';
import UtilisateurService from '@/services/UtilisateurService';
import eleve from '@/store/modules/eleve';
import { ref, onMounted, toRaw } from 'vue';

const { fetchClasseByAnnee, classesByAnnee, fetchClasseByAnneeAndProf, classesByAnneeAndProfesseur, classes } =
  ClasseService();
const { anneeEnCours } = UtilisateurService();
const { user } = UserService();
const { putProfesseursClasse } = ProfesseurService();
const selectedClasses = ref<Classe[]>();
const selectedClassesForAdd = ref<Classe[]>();
const classesByProf = ref<Classe[]>();

const closeBasic = () => {
  displayBasic.value = false;
};

const selectedClasse = ref<Classe>();
const selectedEleves = ref<Eleve[]>();
const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

onMounted(async () => {
  isLoading.value = true;
  await fetchClasseByAnnee(anneeEnCours.value.id);
  await fetchClasseByAnneeAndProf(anneeEnCours.value.id, user.value.professeurs);
  console.log('classeparprof', classesByAnneeAndProfesseur.value);
  console.log('userid', user.value.id);
  console.log('prof', user.value.professeurs);
  isLoading.value = false;
});

async function editClasse() {
  const idsClassesExistant = classesByAnneeAndProfesseur.value.map((c: Classe) => {
    return c['@id'];
  });
  if (selectedClassesForAdd.value) {
    const idsClasses = selectedClassesForAdd.value.map((c: Classe) => {
      return c['@id'];
    });
    const arrayidClasse = idsClassesExistant.concat(idsClasses);

    if (idsClasses) await putProfesseursClasse(user.value.professeurs, arrayidClasse);
  }
  alert('ces classes ont ete ajouter');
}

async function deleteClasseOfProf() {
  const idClassesRetirer = classesByAnneeAndProfesseur.value
    .filter((c) => selectedClasses.value?.findIndex((cs) => c.id === cs.id) === -1)
    .map((cs) => {
      return toRaw(cs['@id']);
    });
  await putProfesseursClasse(user.value.professeurs, idClassesRetirer);
  alert('Votre ou vos élèves on été supprimer de cette classe');
}

const isLoading = ref(false);
</script>