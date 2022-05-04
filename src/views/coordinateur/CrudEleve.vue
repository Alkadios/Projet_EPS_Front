<template>
  <div>
    <DataTable :value="elevesByAnneeAndEtablissement" responsiveLayout="scroll" dataKey="id">
      <Button label="Ajouter un Eleve" @click="openBasic" style="right: 1rem" icon="pi pi-plus" autofocus />
      <Column selectionMode="single" style="width: 3rem" :exportable="false"></Column>

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
                  <center>
                    <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                      <input
                        class="form-control"
                        v-model="nouvelleClasse.libelleClasse"
                        type="libelleClasse"
                        id="libelleClasse"
                        name="libelleClasse"
                        placeholder="Nom Classe"
                      />
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                      <Dropdown
                        v-model="selectedNiveauScolaire"
                        :options="niveauxScolaires"
                        optionLabel="libelle"
                        optionValue="id"
                        placeholder="Selectionner un NiveauScolaire"
                      />
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                      <Dropdown
                        v-model="selectedAnnee"
                        :options="annees"
                        optionLabel="annee"
                        optionValue="id"
                        placeholder="Selectionner une Annee"
                      />
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
                      <Dropdown
                        v-model="selectedEtablissement"
                        :options="etablissements"
                        optionLabel="nom"
                        optionValue="id"
                        placeholder="Selectionner un Etablissement"
                      />
                    </div>
                  </center>
                </div>
                <button type="button" class="btn btn-primary" @click="CreerClasse()">Créer</button>
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
import EleveService from '@/services/EleveService';
import { ref, onMounted } from 'vue';

const {
  fetchElevesByAnneeAndEtablissement,
  elevesByAnneeAndEtablissement,
  saveEleve,
  eleves,
  deleteEleve,
  fetchEleveById,
  eleveById,
  updateEleve,
} = EleveService();

const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
};

onMounted(async () => {
  await fetchElevesByAnneeAndEtablissement(1);
});
</script>
