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
        <Column field="user.email" header="Email" :sortable="true" style="min-width: 12rem"></Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded" @click="onEditEleve(slotProps.data)" />
          </template>
        </Column>
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

  <Dialog
    :header="eleveEnCoursDeModif ? `Modifier un Eleve` : `Ajouter un Eleve`"
    v-model:visible="displayBasic"
    :style="{ width: '50vw' }"
  >
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #content>
            <div class="row">
              <div class="col-12">
                <label class="form-label mb-3" for="username"><strong>Nom</strong></label>
                <input class="form-control mb-3" v-model="nouveauEleve.nom" type="nom" id="nom" name="nom" />
              </div>
              <div class="col-12">
                <label class="form-label mb-3" for="username"><strong>Prenom</strong></label>
                <input
                  class="form-control mb-3"
                  v-model="nouveauEleve.prenom"
                  type="prenom"
                  id="prenom"
                  name="prenom"
                />
              </div>
              <div class="col-12">
                <label class="form-label mb-3" for="telephone"><strong>Telephone</strong></label>
                <input
                  class="form-control mb-3"
                  v-model="nouveauEleve.telephone"
                  type="telephone"
                  id="telephone"
                  name="telephone"
                />
              </div>
              <div class="col-12">
                <label class="form-label mb-3" for="email"><strong>Email</strong></label>
                <input
                  v-if="!eleveEnCoursDeModif"
                  class="form-control mb-3"
                  v-model="nouveauUtilisateur.email"
                  type="email"
                  id="email"
                  name="email"
                />
                <span v-else class="mb-3"> {{ nouveauUtilisateur.email }}</span>
              </div>
              <div class="col-12">
                <label class="form-label mb-3" for="mailParent1"><strong>Mail du responsable légal n°1</strong></label>
                <input
                  class="form-control mb-3"
                  v-model="nouveauEleve.mailParent1"
                  type="mailParent1"
                  id="mailParent1"
                  name="mailParent1"
                />
              </div>
              <div class="col-12">
                <label class="form-label mb-3" for="mailParent2"><strong>Mail du responsable légal n°2</strong></label>
                <input
                  class="form-control mb-3"
                  v-model="nouveauEleve.mailParent2"
                  type="email"
                  id="mailParent2"
                  name="mailParent2"
                />
              </div>
              <div class="col-6 mb-3">
                <input type="radio" id="M" value="M" name="sexeEleve" v-model="nouveauEleve.sexeEleve" />
                <label for="M">M</label>
              </div>
              <div class="col-6 mb-3">
                <input type="radio" id="F" value="F" name="sexeEleve" v-model="nouveauEleve.sexeEleve" />
                <label for="F">F</label>
              </div>

              <div v-if="!eleveEnCoursDeModif" class="col-12">
                <label class="form-label mb-3" for="date"><strong>Date de Naissance</strong></label>
                <input class="form-control mb-3" v-model="nouveauEleve.dateNaiss" type="date" id="date" name="date" />
              </div>
              <div v-if="!eleveEnCoursDeModif" class="col-12">
                <label class="form-label mb-3" for="password"><strong>Mot de passe</strong></label>
                <input
                  class="form-control mb-3"
                  v-model="nouveauUtilisateur.password"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
            </div>
            <div class="mb-3" style="text-align: center">
              <button v-if="!eleveEnCoursDeModif" class="btn btn-primary btn-sm" type="submit" @click="onSubmitUtil">
                Créer
              </button>
              <button v-else class="btn btn-primary btn-sm" type="submit" @click="onUpdateEleve(nouveauEleve)">
                Modifier
              </button>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Role from '@/constants/Role';
import ObjectUtils from '@/utils/ObjectUtils';
import EleveService from '@/services/EleveService';
import UserService from '@/services/UserService';
import UtilisateurService from '@/services/UtilisateurService';
import type { Eleve, User } from '@/models';

const router = useRouter();
const toast = useToast();

const { isObjectEmpty } = ObjectUtils();
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

const displayBasic = ref(false);
const isLoading = ref(false);
const nouveauUtilisateur = ref<User>({
  email: '',
  roles: [Role.ELEVE],
  password: '',
} as User);
const eleveEnCoursDeModif = ref(false);

/*
Une erreur TypeScript ? Bizarre le typage est bon normalement... ah non 😅
*/
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

async function CreerEleve() {
  isLoading.value = true;
  /*
  Pourquoi utiliser un objet quand on peut passer les propriétés une par une ??? 😪 Bon courage pour la refacto 💪 perso j'ai la flemme
  */
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
  toast.add({ severity: 'success', summary: 'Succès', detail: `L'élève a bien été enregistré`, life: 4000 });
  displayBasic.value = false;
  await fetchElevesByEtablissement(user.value.currentEtablissement);
  isLoading.value = false;
}

async function onEditEleve(eleve: Eleve) {
  console.log(eleve);
  eleveEnCoursDeModif.value = true;
  nouveauEleve.value = eleve;
  nouveauUtilisateur.value = eleve.user;
  displayBasic.value = true;
}

async function onUpdateEleve(Eleve: Eleve) {
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
  displayBasic.value = false;
  eleveEnCoursDeModif.value = false;
  isLoading.value = false;
  toast.add({ severity: 'success', summary: 'Succès', detail: `L'élève a bien été enregistré`, life: 4000 });
  nouveauEleve.value = {
    id: undefined,
    nom: '',
    prenom: '',
    telephone: '',
    mailParent1: '',
    mailParent2: '',
    sexeEleve: '',
    user: '',
    etablissement: user.value.currentEtablissement,
  } as Eleve;
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

const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
};
</script>
