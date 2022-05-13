<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
    <div class="card-body p-5">
      <DataTable
        :value="classesByAnnee"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        responsiveLayout="scroll"
        dataKey="id"
      >
        <Button label="Ajouter une Classe" @click="openBasic" style="right: 1rem" icon="pi pi-plus" autofocus />
        <Column
          field="NiveauScolaire.libelle"
          header="NiveauScolaire"
          :sortable="true"
          style="min-width: 12rem"
        ></Column>
        <Column field="Annee.annee" header="Annee" :sortable="true" style="min-width: 12rem"></Column>
        <Column field="etablissement.nom" header="etablissement" :sortable="true" style="min-width: 12rem"></Column>
        <Column field="libelleClasse" header="libelleClasse" :sortable="true" style="min-width: 12rem"></Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-success mr-2"
              @click="supprimerClasse(slotProps.data.id)"
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
  </Dialog>
</template>

<script lang="ts" setup>
import { Classe } from '@/models';
import AnneeService from '@/services/AnneeService';
import ClasseService from '@/services/ClasseService';
import EtablissementService from '@/services/EtablissementService';
import NiveauScolaireService from '@/services/NiveauScolaireService';
import { ref, onMounted, watch } from 'vue';
import UserService from '@/services/UserService';
import ObjectUtils from '@/utils/ObjectUtils';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const { isObjectEmpty } = ObjectUtils();
const { user, redirectToHomePage } = UserService();
const { fetchClasseByAnnee, classesByAnnee, saveClasse, deleteClasse, classesById, fetchClasseById } = ClasseService();
const { etablissements, fetchAllEtablissements } = EtablissementService();
const { niveauxScolaires, fetchAllNiveauxScolaires } = NiveauScolaireService();
const { annees, fetchAllAnnees } = AnneeService();

const selectedNiveauScolaire = ref();
const selectedAnnee = ref();
const selectedEtablissement = ref();
const isLoading = ref(false);
const classeDialog = ref(false);

const nouvelleClasse = ref<Classe>({
  libelleClasse: '',
  NiveauScolaire: '',
  Annee: '',
  etablissement: '',
});

async function CreerClasse() {
  isLoading.value = true;
  await saveClasse(
    nouvelleClasse.value.libelleClasse,
    'api/niveau_scolaires/' + selectedNiveauScolaire.value,
    'api/annees/' + selectedAnnee.value,
    'api/etablissements/' + selectedEtablissement.value
  );
  alert('Votre Classe à ete créer');
  displayBasic.value = false;
  await fetchClasseByAnnee(3);
  isLoading.value = false;
}

const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

async function supprimerClasse(idClasse: number) {
  if (confirm('Voulez vous vraiment supprimer ?')) {
    isLoading.value = true;
    await deleteClasse(idClasse);
    await fetchClasseByAnnee(3);
    isLoading.value = false;
  }
}

const closeBasic = () => {
  displayBasic.value = false;
};

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (user.value.roles != 'Admin') {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    await fetchClasseByAnnee(3);
    await fetchAllEtablissements();
    await fetchAllNiveauxScolaires();
    await fetchAllAnnees();
    isLoading.value = false;
  }
});
</script>
