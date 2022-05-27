<template>
  <div class="card shadow-lg o-hidden border-0 m-5">
    <div class="card-body p-5">
      <h1>Création des élèves</h1>
      <DataTable
        :value="elevesByEtablissement"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        responsiveLayout="scroll"
        dataKey="id"
      >
        <Button label="Ajouter un Eleve" @click="openBasic" style="right: 1rem" icon="pi pi-plus" autofocus />
        <Column field="nom" header="nom" :sortable="true" style="min-width: 12rem"></Column>
        <Column field="prenom" header="prenom" :sortable="true" style="min-width: 12rem"></Column>
        <Column field="telephone" header="telephone" :sortable="true" style="min-width: 12rem"></Column>
        <Column field="mailParent1" header="mailParent1" :sortable="true" style="min-width: 12rem"></Column>
        <Column field="mailParent2" header="mailParent2" :sortable="true" style="min-width: 12rem"></Column>
        <Column field="sexeEleve" header="sexeEleve" :sortable="true" style="min-width: 12rem"></Column>
        <Column field="dateNaiss" header="dateNaiss" :sortable="true" style="min-width: 12rem"></Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="supprimerEleve(slotProps.data)"
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

  <Dialog header="Ajouter un Eleve" v-model:visible="displayBasic" :style="{ width: '50vw' }">
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
                    <input class="form-control" v-model="nouveauEleve.nom" type="nom" id="nom" name="nom" />
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
                    <input class="form-control" v-model="nouveauEleve.prenom" type="prenom" id="prenom" name="prenom" />
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
                      v-model="nouveauEleve.telephone"
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
                    <label class="form-label" for="mailParent1"><strong>mailParent1</strong></label>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <input
                      class="form-control"
                      v-model="nouveauEleve.mailParent1"
                      type="mailParent1"
                      id="mailParent1"
                      name="mailParent1"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label" for="mailParent2"><strong>mailParent2</strong></label>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <input
                      class="form-control"
                      v-model="nouveauEleve.mailParent2"
                      type="mailParent2"
                      id="mailParent2"
                      name="mailParent2"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label" for="sexeEleve"><strong>sexeEleve</strong></label>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <input type="radio" id="M" value="M" name="sexeEleve" v-model="nouveauEleve.sexeEleve" />
                    <label for="M">M</label>
                    <br />
                    <input type="radio" id="F" value="F" name="sexeEleve" v-model="nouveauEleve.sexeEleve" />
                    <label for="F">F</label>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-4">
                  <div class="mb-3">
                    <label class="form-label" for="date"><strong>Date de Naissance</strong></label>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <input class="form-control" v-model="nouveauEleve.dateNaiss" type="date" id="date" name="date" />
                  </div>
                </div>
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

  <Dialog header="Modifier un Eleve" v-model:visible="eleveDialog" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #content>
            <center><h1>Modifier un Eleve</h1></center>
            <form>
              <div class="container">
                <div class="row">
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="nom">Nom : </label>
                    <InputText id="nom" v-model="eleveById.nom" required="true" autofocus />
                  </div>
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="prenom">Prenom : </label>
                    <InputText v-model="eleveById.prenom" id="prenom" required="true" autofocus />
                  </div>
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="telephone">Telephone : </label>
                    <InputText id="telephone" v-model="eleveById.telephone" required="true" autofocus />
                  </div>
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="mailParent1">mail Parent 1 : </label>
                    <InputText v-model="eleveById.mailParent1" id="mailParent1" required="true" autofocus />
                  </div>
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="mailParent2">mail Parent 2 : </label>
                    <InputText id="mailParent2" v-model="eleveById.mailParent2" required="true" autofocus />
                  </div>
                  <div class="mt-3 col-lg-12 col-md-12 col-sm-12">
                    <label for="sexeEleve">sexe Eleve : </label>
                    <InputText v-model="eleveById.sexeEleve" id="sexeEleve" required="true" autofocus />
                  </div>
                  <Button class="mt-4" label="Modifier" icon="pi pi-check" @click="editEleve(eleveById)" autofocus />
                </div>
              </div>
            </form>
          </template>
        </Card>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { Eleve, User } from '@/models';
import EleveService from '@/services/EleveService';
import UserService from '@/services/UserService';
import UtilisateurService from '@/services/UtilisateurService';
import Role from '@/constants/Role';
import { ref, onMounted } from 'vue';
import ObjectUtils from '@/utils/ObjectUtils';
import { useRoute, useRouter } from 'vue-router';

const { isObjectEmpty } = ObjectUtils();
const router = useRouter();
const { user } = UserService();
const {
  saveEleve,
  elevesByEtablissement,
  fetchElevesByEtablissement,
  deleteEleve,
  fetchEleveById,
  eleveById,
  updateEleve,
} = EleveService();

const { deleteUser, redirectToHomePage } = UserService();
const { etablissement, anneeEnCours } = UtilisateurService();

const eleveDialog = ref(false);
const isLoading = ref(false);
const nouveauUtilisateur = ref<User>({
  email: '',
  roles: [Role.ELEVE, Role.USER],
  password: '',
} as User);

//Une erreur TypeScript ? Bizarre le type est bon normalement... ah non 😅
const nouveauEleve = ref<Eleve>({
  nom: '',
  prenom: '',
  telephone: '',
  mailParent1: '',
  mailParent2: '',
  sexeEleve: '',
  user: '',
  etablissement: user.value.currentEtablissement,
  dateNaiss: new Date(),
} as Eleve);

async function CreerEleve() {
  isLoading.value = true;
  //Pourquoi utiliser un objet quand on peut passer les propriétés une par une ??? 😪 Bon courage pour la refacto 💪 perso j'ai la flemme
  await saveEleve(
    nouveauUtilisateur.value.email,
    nouveauUtilisateur.value.roles,
    nouveauUtilisateur.value.password,
    nouveauEleve.value.nom,
    nouveauEleve.value.prenom,
    nouveauEleve.value.telephone,
    nouveauEleve.value.mailParent1,
    nouveauEleve.value.mailParent2,
    nouveauEleve.value.sexeEleve,
    nouveauEleve.value.etablissement,
    nouveauEleve.value.dateNaiss
  );
  alert('Votre Eleve à ete créer');
  displayBasic.value = false;
  await fetchElevesByEtablissement(user.value.currentEtablissement);
  isLoading.value = false;
}

async function champsEleve(idEleve: number) {
  isLoading.value = true;
  eleveDialog.value = true;
  await fetchEleveById(idEleve);
  isLoading.value = false;
}

async function editEleve(Eleve: Eleve) {
  isLoading.value = true;
  await updateEleve(
    Eleve.id,
    eleveById.value.nom,
    eleveById.value.prenom,
    eleveById.value.mailParent1,
    eleveById.value.mailParent2,
    eleveById.value.telephone,
    eleveById.value.sexeEleve
  );
  eleveDialog.value = false;
  isLoading.value = false;
  alert('Votre Eleve à ete modifié');
}

async function supprimerEleve(Eleve: Eleve) {
  if (confirm('Voulez vous vraiment supprimer cette eleve?')) {
    isLoading.value = true;
    await deleteEleve(Eleve.id);
    await deleteUser(Eleve.user.id);
    await fetchElevesByEtablissement(user.value.currentEtablissement);
    isLoading.value = false;
  }
}

function onSubmitUtil() {
  CreerEleve();
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
    await fetchElevesByEtablissement(user.value.currentEtablissement);
    isLoading.value = false;
  }
});
</script>
