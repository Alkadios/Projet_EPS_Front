<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
    <div class="card-body p-5">
      <h1>Gestion Coordonnateur</h1>
      <DataTable
        :value="professeurByRoles"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        responsiveLayout="scroll"
        dataKey="id"
      >
        <Button label="Ajouter un Coordonateur" @click="openBasic" style="right: 1rem" icon="pi pi-plus" autofocus />

        <Column field="nom" header="nom" :sortable="true" style="min-width: 12rem"></Column>
        <Column field="prenom" header="prenom" :sortable="true" style="min-width: 12rem"></Column>
        <Column field="telephone" header="telephone" :sortable="true" style="min-width: 12rem"></Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="champsProf(slotProps.data.id)"
            />
          </template>
        </Column>

        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="supprimerProf(slotProps.data)"
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

    <Dialog header="Ajouter un Coordonateur" v-model:visible="displayBasic" :style="{ width: '50vw' }">
      <div class="row" style="place-content: center">
        <div class="col-8">
          <Card>
            <template #content>
              <form class="mt-4" @submit.prevent="onSubmitUtil">
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Nom</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input class="form-control" v-model="nouveauProf.nom" type="nom" id="nom" name="nom" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Prenom</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauProf.prenom"
                        type="prenom"
                        id="prenom"
                        name="prenom"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="telephone"><strong>telephone</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauProf.telephone"
                        type="telephone"
                        id="telephone"
                        name="telephone"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="email"><strong>Email</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauUtilisateur.email"
                        type="email"
                        id="email"
                        name="email"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="password"><strong>Mot de passe</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauUtilisateur.password"
                        required
                        type="password"
                        id="password"
                        name="password"
                      />
                    </div>
                  </div>
                </div>

                <div class="mb-3" style="text-align: center">
                  <button class="btn btn-primary btn-sm" type="submit">Créer</button>
                </div>
              </form>
            </template>
          </Card>
        </div>
      </div>
    </Dialog>

    <Dialog header="Modifier un Professeur" v-model:visible="profDialog" :style="{ width: '50vw' }">
      <div class="row" style="place-content: center">
        <div class="col-8">
          <Card>
            <template #content>
              <h1>Modifier un Coordonnateur</h1>
              <form>
                <div class="container">
                  <div class="row">
                    <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                      <label for="nom">Nom : </label>
                      <InputText id="nom" v-model="professeurById.nom" required="true" autofocus />
                    </div>
                    <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                      <label for="prenom">Prenom : </label>
                      <InputText v-model="professeurById.prenom" id="prenom" required="true" autofocus />
                    </div>
                    <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                      <label for="telephone">Telephone : </label>
                      <InputText id="telephone" v-model="professeurById.telephone" required="true" autofocus />
                    </div>
                    <Button
                      class="mt-4"
                      label="Modifier"
                      icon="pi pi-check"
                      @click="editProf(professeurById.id)"
                      autofocus
                    />
                  </div>
                </div>
              </form>
            </template>
          </Card>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import { useToast } from 'primevue/usetoast';
import Role from '@/constants/Role';
import ProfesseurService from '@/services/ProfesseurService';
import UserService from '@/services/UserService';
import ObjectUtils from '@/utils/ObjectUtils';
import type { Professeur, User } from '@/models';

const toast = useToast();
const { isObjectEmpty } = ObjectUtils();
const { fetchProfByRoles, saveProfesseur, deleteProf, updateProf, fetchProfById, professeurById, professeurByRoles } =
  ProfesseurService();
const { redirectToHomePage, user } = UserService();

const isLoading = ref(false);
const profDialog = ref(false);
const displayBasic = ref(false);

const nouveauUtilisateur = ref({
  email: '',
  roles: [Role.ADMIN],
  password: '',
});

const nouveauProf = ref({
  id: '',
  nom: '',
  prenom: '',
  telephone: '',
  etablissements: user.value.currentEtablissement,
});

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (!user.value.roles.includes(Role.ADMIN)) {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    await fetchProfByRoles(Role.ADMIN);
    isLoading.value = false;
  }
});

async function CreerProfesseur() {
  await saveProfesseur(
    nouveauUtilisateur.value.email,
    nouveauUtilisateur.value.roles,
    nouveauUtilisateur.value.password,
    nouveauProf.value.nom,
    nouveauProf.value.prenom,
    nouveauProf.value.telephone,
    nouveauProf.value.etablissements
  );
  toast.add({ severity: 'success', summary: 'Succès', detail: `Le coordonateur a bien été enregistré`, life: 4000 });
  displayBasic.value = false;
  await fetchProfByRoles(Role.ADMIN);
}

async function champsProf(idProf: number) {
  isLoading.value = true;
  profDialog.value = true;
  await fetchProfById(idProf);
  isLoading.value = false;
}

async function editProf(idProf: number) {
  isLoading.value = true;
  await updateProf(idProf, professeurById.value.nom, professeurById.value.prenom, professeurById.value.telephone);
  toast.add({ severity: 'success', summary: 'Succès', detail: `Le coordonateur a bien été enregistré`, life: 4000 });
  profDialog.value = false;
  isLoading.value = false;
}

async function supprimerProf(Professeur: Professeur) {
  if (confirm('Voulez vous vraiment supprimer ce coordonnateur ?')) {
    isLoading.value = true;
    await deleteProf(Professeur.id);
    await fetchProfByRoles(Role.ADMIN);
    isLoading.value = false;
  }
}

function onSubmitUtil() {
  CreerProfesseur();
}

const openBasic = () => {
  displayBasic.value = true;
};
</script>
