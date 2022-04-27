<template>
  <Dropdown
    v-model="selectedClasse"
    :options="classesByAnnee"
    optionLabel="libelleClasse"
    optionValue="id"
    placeholder="Selectionner une classe"
  />

  <div>
    <DataTable :value="mesEleves" responsiveLayout="scroll">
      <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"> </Column>
    </DataTable>
  </div>



  <Dialog header="Ajouter un indicateur" v-model:visible="displayBasic" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #title>
            <InputText id="Title" type="text" placeholder="Titre" />
          </template>
          <template #content>
            <div style="margin-top: 1.5rem">
              <InputText id="UrlVideo" type="text" placeholder="URL vidéo" />
            </div>
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
import { Classe, Eleve, User, Utilisateur } from '@/models';
import ClasseService from '@/services/ClasseService';
import EleveService from '@/services/EleveService';
import eleve from '@/store/modules/eleve';
import etablissement from '@/store/modules/etablissement';
import { Class } from '@babel/types';
import { ref, onMounted, watch } from 'vue';

const { fetchAllEleves, eleves } = EleveService();
const { fetchAllClasses, fetchClasseByAnnee, classesByAnnee, classes } = ClasseService();
const selectedClasse = ref();

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
  await fetchClasseByAnnee(1);
});

const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
};

watch(
  () => selectedClasse.value,
  async () => {
    if (selectedClasse.value) {
      mesElevesByClasse(selectedClasse.value);
    }
  }
);

const mesEleves = ref<Eleve[]>([]);

function mesElevesByClasse(idClasse: number) {
  mesEleves.value = classesByAnnee.value.find((a) => a.id === idClasse)!.eleves;
}

console.log(mesEleves.value);
</script>
