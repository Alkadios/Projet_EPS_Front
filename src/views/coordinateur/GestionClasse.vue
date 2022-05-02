<template>
  <div>
    <DataTable :value="classesByAnnee" responsiveLayout="scroll" dataKey="id">
      <Button label="Ajouter une Classe" @click="openBasic" style="right: 1rem" icon="pi pi-plus" autofocus />
      <Column selectionMode="single" style="width: 3rem" :exportable="false"></Column>

      <Column field="NiveauScolaire" header="NiveauScolaire" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="Annee" header="Annee" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="etablissement" header="etablissement" :sortable="true" style="min-width: 12rem"></Column>
      <Column field="libelleClasse" header="libelleClasse" :sortable="true" style="min-width: 12rem"></Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="champsEleve(slotProps.data.id)"
          />
        </template>
      </Column>

      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="supprimerEleve(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog header="Ajouter une Classe" v-model:visible="displayBasic" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #content>
            <center><h1>Ajouter une Classe</h1></center>
            <form>
              <div class="container">
                <div class="row">
                  <div class="offset-lg-2 offset-md-2 col-lg-4 col-md-4 col-sm-12">
                    <label for="nom">Nom</label>
                    <InputText id="nom" v-model="eleveById.nom" required="true" autofocus />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label for="prenom">Prenom</label>
                    <InputText v-model="eleveById.prenom" id="prenom" required="true" autofocus />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="offset-lg-2 offset-md-2 col-lg-4 col-md-4 col-sm-12">
                    <label for="telephone">Telephone</label>
                    <InputText id="telephone" v-model="eleveById.telephone" required="true" autofocus />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label for="mailParent1">mail Parent 1</label>
                    <InputText v-model="eleveById.mailParent1" id="mailParent1" required="true" autofocus />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="offset-lg-2 offset-md-2 col-lg-4 col-md-4 col-sm-12">
                    <label for="mailParent2">mail Parent 2</label>
                    <InputText id="mailParent2" v-model="eleveById.mailParent2" required="true" autofocus />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12">
                    <label for="sexeEleve">sexe Eleve</label>
                    <InputText v-model="eleveById.sexeEleve" id="sexeEleve" required="true" autofocus />
                  </div>
                </div>
                <button type="button" class="btn btn-primary" @click="editEleve(eleveById.id)">Update</button>
              </div>
            </form>
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
import { Class } from '@babel/types';
import { ref, onMounted, watch } from 'vue';

const { fetchClasseByAnnee, classesByAnnee, saveClasse } = ClasseService();

console.log(ref<Classe[]>([]));

let columns;

const nouvelleClasse = ref<Classe>({
  libelleClasse: '',
  NiveauScolaire: '',
  Annee: '',
  etablissement: '',
});


function CreerEleve() {
  saveClasse(
    nouvelleClasse.value.libelleClasse,

  );
}



onMounted(async () => {
  await fetchClasseByAnnee(1);
});

const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
};
</script>
