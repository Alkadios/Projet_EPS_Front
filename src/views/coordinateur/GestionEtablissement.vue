<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
    <div class="card-body p-5">
      <h1>Gestion des établissements</h1>
      <DataTable
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :value="etablissements"
        responsiveLayout="scroll"
        dataKey="id"
      >
        <Button label="Ajouter un établissement" @click="openModal()" style="right: 1rem" icon="pi pi-plus" autofocus />

        <Column field="nom" header="Nom de l'établissement" :sortable="true" style="min-width: 12rem"></Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editEtablissement(slotProps.data)"
            />
          </template>
        </Column>

        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning ms-3"
              @click="supprimerEtablissement(slotProps.data)"
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

    <Dialog :header="titreModal" v-model:visible="afficherModal" :style="{ width: '50vw' }">
      <div class="row" style="place-content: center">
        <div class="col-8">
          <Card>
            <template #content>
              <div class="row">
                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label" for="nom"><strong>Nom</strong></label>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <InputText type="text" v-model="nouveauEtablissement.nom" id="nom" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label" for="mail"><strong>Mail</strong></label>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <InputText type="text" v-model="nouveauEtablissement.mail" id="mail" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label" for="telephone"><strong>Téléphone</strong></label>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <InputText type="text" v-model="nouveauEtablissement.tel" id="telephone" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label" for="adresse"><strong>Adresse</strong></label>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <InputText type="text" v-model="nouveauEtablissement.adresse" id="adresse" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <label class="form-label" for="cp"><strong>Code postal</strong></label>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <InputText type="text" v-model="nouveauEtablissement.cp" id="cp" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label" for="ville"><strong>Ville</strong></label>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <InputText type="text" v-model="nouveauEtablissement.ville" id="ville" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label" for="niveauxScolaire"><strong>Niveaux scrolaires</strong></label>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <MultiSelect
                      v-model="nouveauEtablissement.niveauScolaire"
                      :options="niveauxScolaires"
                      optionLabel="libelle"
                      display="chip"
                      id="niveauxScolaire"
                      dataKey="id"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3" style="text-align: center">
                <Button label="Enregistrer" @click="onSaveEtablissement()" />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import ObjectUtils from '@/utils/ObjectUtils';
import UserService from '@/services/UserService';
import EtablissementService from '@/services/EtablissementService';
import NiveauScolaireService from '@/services/NiveauScolaireService';
import { Professeur, Etablissement, NiveauScolaire } from '@/models';
import Role from '@/constants/Role';

const router = useRouter();
const toast = useToast();
const { isObjectEmpty } = ObjectUtils();
const { user, redirectToHomePage } = UserService();

const { etablissements, fetchAllEtablissements, saveEtablissement, deleteEtablissement } = EtablissementService();
const { niveauxScolaires, fetchAllNiveauxScolaires } = NiveauScolaireService();

const isLoading = ref(false);
const afficherModal = ref(false);

const nouveauEtablissement = ref<Etablissement>({
  nom: '',
  adresse: '',
  cp: '',
  ville: '',
  mail: '',
  tel: '',
} as Etablissement);
const etablissementEnModif = ref(false);

const titreModal = computed(() => {
  if (etablissementEnModif.value) {
    return `Modifier l'étabissement`;
  } else {
    return 'Ajouter un établissement';
  }
});

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (!user.value.roles.includes(Role.ADMIN)) {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    await fetchAllEtablissements();
    await fetchAllNiveauxScolaires();
    isLoading.value = false;
  }
});

async function onSaveEtablissement() {
  await saveEtablissement(nouveauEtablissement.value);
  afficherModal.value = false;
  toast.add({ severity: 'success', summary: 'Succès', detail: `L'établissement a bien été enregistré`, life: 5000 });
}

function resetNouveauEtablissement() {
  nouveauEtablissement.value = {
    nom: '',
    adresse: '',
    cp: '',
    ville: '',
    mail: '',
    tel: '',
    niveauScolaire: [] as NiveauScolaire[],
  } as Etablissement;
}

function openModal() {
  resetNouveauEtablissement();
  afficherModal.value = true;
}

function editEtablissement(etablissement: Etablissement) {
  etablissementEnModif.value = true;
  nouveauEtablissement.value = {
    id: etablissement.id,
    nom: etablissement.nom,
    adresse: etablissement.adresse,
    cp: etablissement.cp,
    ville: etablissement.ville,
    tel: etablissement.tel,
    mail: etablissement.mail,
    niveauScolaire: etablissement.niveauScolaire,
  } as Etablissement;
  afficherModal.value = true;
}

async function supprimerEtablissement(etablissement: Etablissement) {
  if (confirm('Voulez-vous vraiment supprimer cet établissement ?')) {
    isLoading.value = true;
    await deleteEtablissement(etablissement.id);
    isLoading.value = false;
  }
}
</script>
