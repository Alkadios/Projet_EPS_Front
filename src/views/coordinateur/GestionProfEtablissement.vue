<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
    <div class="card-body p-5">
      <h3>Attribution des professeurs dans un établissement</h3>
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
            @click="deleteFromEtablissement(selectedEtablissement!.id)"
            style="right: 1rem"
            icon="pi pi-trash"
            :disabled="!selectedProfesseurOnEtablissement || selectedProfesseurOnEtablissement?.length === 0"
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
    </div>
  </div>

  <Dialog
    header="Ajouter des professeurs dans l'établissement"
    :paginator="true"
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50]"
    v-model:visible="displayBasic"
    :style="{ width: '50vw' }"
  >
    <div class="row" style="place-content: center">
      <div class="col">
        <Card>
          <template #content>
            <DataTable
              :value="professeursNotInEtablissements"
              v-model:selection="selectedProfs"
              responsiveLayout="scroll"
              dataKey="id"
            >
              <Column selectionMode="multiple"></Column>
              <Column field="nom" header="Nom" :sortable="true" style="min-width: 12rem"></Column>
              <Column field="prenom" header="Prenom" :sortable="true" style="min-width: 12rem"></Column>
            </DataTable>
            <button type="button" class="btn btn-primary" @click="editEtablissement(selectedEtablissement!.id)">
              Ajouter
            </button>
          </template>
        </Card>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Role from '@/constants/Role';
import ObjectUtils from '@/utils/ObjectUtils';
import EtablissementService from '@/services/EtablissementService';
import ProfesseurService from '@/services/ProfesseurService';
import UserService from '@/services/UserService';
import type { Classe, Eleve, Etablissement, Professeur } from '@/models';

const router = useRouter();
const toast = useToast();

const { isObjectEmpty } = ObjectUtils();

const { fetchAllEtablissements, etablissements, putEtablissementProfs } = EtablissementService();
const { fetchAllProfs, professeurs } = ProfesseurService();
const { user, redirectToHomePage } = UserService();

const mesProfs = ref<Professeur[]>([]);
const selectedEtablissement = ref<Etablissement>();
const selectedProfs = ref<Professeur[]>();
const selectedProfesseurOnEtablissement = ref<Professeur[]>();
const professeursNotInEtablissements = ref<Professeur[]>([]);
const displayBasic = ref(false);
const isLoading = ref(false);

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (!user.value.roles.includes(Role.ADMIN)) {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    await fetchAllEtablissements();
    await fetchAllProfs();
    isLoading.value = false;
  }
});

function mesProfsByEtablissement(idEtablissement: number) {
  mesProfs.value = etablissements.value.find((a) => a.id === idEtablissement)!.Professeur;
}

const openBasic = () => {
  displayBasic.value = true;
  filterProfsNotInEtablissement();
};

function filterProfsNotInEtablissement() {
  professeursNotInEtablissements.value = professeurs.value
    .filter((p: any) => !p.etablissements.includes(selectedEtablissement.value?.['@id']))
    .map((p) => {
      return toRaw(p);
    });
  isLoading.value = false;
}

function onEtablissementChange() {
  if (selectedEtablissement.value) {
    mesProfsByEtablissement(selectedEtablissement.value.id);
  }
}

async function editEtablissement(idEtablissement: number) {
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
  displayBasic.value = false;
  toast.add({
    severity: 'success',
    summary: 'Succès',
    detail: `Les professeurs ont bien été ajoutés à l'établissement`,
    life: 4000,
  });

  isLoading.value = true;
  mesProfsByEtablissement(idEtablissement);
  onEtablissementChange();
  isLoading.value = false;
}

async function deleteFromEtablissement(idEtablissement: number) {
  if (confirm('Voulez-vous vraiment retirer ces professeurs de cet etablissement ?')) {
    const idProfsRetirer = mesProfs.value
      .filter((e) => selectedProfesseurOnEtablissement.value?.findIndex((ec) => ec.id === e.id) === -1)
      .map((e) => {
        return toRaw(e['@id']);
      });
    await putEtablissementProfs(idEtablissement, idProfsRetirer);
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: `Les professeurs ont bien été retirés de l'établissement`,
      life: 4000,
    });
    mesProfsByEtablissement(idEtablissement);
  }
}
</script>
