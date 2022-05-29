<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
    <div class="card-body p-5">
      <h1>Gestion des professeurs</h1>
      <DataTable
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :value="professeursByEtablissement"
        responsiveLayout="scroll"
        dataKey="id"
      >
        <Button label="Ajouter un Professeur" @click="openBasic" style="right: 1rem" icon="pi pi-plus" autofocus />

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

    <Dialog header="Ajouter un Professeur" v-model:visible="displayBasic" :style="{ width: '50vw' }">
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
              <h1>Modifier un Prof</h1>
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
import { Professeur, User } from '@/models';
import ProfesseurService from '@/services/ProfesseurService';
import UserService from '@/services/UserService';
import UtilisateurService from '@/services/UtilisateurService';
import { ref, onMounted } from 'vue';
import Role from '@/constants/Role';
import ObjectUtils from '@/utils/ObjectUtils';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const { isObjectEmpty } = ObjectUtils();
const { user, redirectToHomePage } = UserService();
const { etablissement } = UtilisateurService();
const {
  fetchProfesseursByEtablissement,
  saveProfesseur,
  professeursByEtablissement,
  deleteProf,
  updateProf,
  fetchProfById,
  professeurById,
} = ProfesseurService();
const { deleteUser } = UserService();
const isLoading = ref(false);
const profDialog = ref(false);

const nouveauUtilisateur = ref<User>({
  email: '',
  roles: [Role.PROF, Role.USER],
  password: '',
});

const nouveauProf = ref<Professeur>({
  id: '',
  nom: '',
  prenom: '',
  telephone: '',
  etablissements: user.value.currentEtablissement,
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
  alert('Votre Professeur à ete créer');
  displayBasic.value = false;
  await fetchProfesseursByEtablissement(user.value.currentEtablissement);
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
  alert('Votre Prof à ete modifié');
  profDialog.value = false;
  isLoading.value = false;
}

async function supprimerProf(Professeur: Professeur) {
  if (confirm('Voulez vous vraiment supprimer ce professeur?')) {
    isLoading.value = true;
    await deleteProf(Professeur.id);
    await fetchProfesseursByEtablissement(user.value.currentEtablissement);
    isLoading.value = false;
  }
}

function onSubmitUtil() {
  CreerProfesseur();
}

const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
};

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (!user.value.roles.includes(Role.ADMIN)) {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    await fetchProfesseursByEtablissement(user.value.currentEtablissement);
    console.log('prof', professeursByEtablissement.value);
    console.log('etablId', user.value.currentEtablissement);
    isLoading.value = false;
  }
});
</script>
