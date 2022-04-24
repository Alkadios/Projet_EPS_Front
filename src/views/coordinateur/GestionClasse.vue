<template>
  <Dropdown
    v-model="selectedClasse"
    :options="classes"
    optionLabel="libelleClasse"
    placeholder="Selectionner une classe"
  />

  <div>
    <DataTable :value="eleves" responsiveLayout="scroll">
      <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"> </Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { Classe, Eleve, User, Utilisateur } from '@/models';
import ClasseService from '@/services/ClasseService';
import EleveService from '@/services/EleveService';
import { ref, onMounted } from 'vue';

const { fetchAllEleves, eleves } = EleveService();
const { fetchAllClasses, classes } = ClasseService();
const selectedClasse = null;

console.log(ref<Classe[]>([]));

let columns;

columns = [
  { field: 'nom', header: 'nom' },
  { field: 'prenom', header: 'prenom' },
  { field: 'telephone', header: 'telephone' },
  { field: 'mailParent1', header: 'MailParent1' },
];

onMounted(async () => {
  await fetchAllEleves();
  await fetchAllClasses();
});


</script>
