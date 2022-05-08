<template>
  <div>
    <h1>GestionPROF</h1>
    <DataTable :value="professeursByEtablissement" responsiveLayout="scroll" dataKey="id">
      <Button label="Ajouter un Professeur" @click="openBasic" style="right: 1rem" icon="pi pi-plus" autofocus />
      <Column selectionMode="single" style="width: 3rem" :exportable="false"></Column>

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
      <template #footer>
        <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
        <Button label="Yes" icon="pi pi-check" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { Professeur, User } from '@/models';
import ProfesseurService from '@/services/ProfesseurService';
import { ref, onMounted } from 'vue';

const { fetchProfesseursByEtablissement, saveProfesseur, professeursByEtablissement } = ProfesseurService();
const isLoading = ref(false);

const nouveauUtilisateur = ref<User>({
  email: '',
  roles: ['Eleve'],
  password: '',
});

const nouveauProf = ref<Professeur>({
  id: '',
  nom: '',
  prenom: '',
  telephone: '',
});

async function CreerProfesseur() {
  await saveProfesseur(
    nouveauUtilisateur.value.email,
    nouveauUtilisateur.value.roles,
    nouveauUtilisateur.value.password,
    nouveauProf.value.nom,
    nouveauProf.value.prenom,
    nouveauProf.value.telephone
  );
  alert('Votre Professueur à ete créer');
  displayBasic.value = false;
  await fetchProfesseursByEtablissement(1);
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
  isLoading.value = true;
  await fetchProfesseursByEtablissement(1);
  console.log('prof', professeursByEtablissement.value);
  isLoading.value = false;
});
</script>
