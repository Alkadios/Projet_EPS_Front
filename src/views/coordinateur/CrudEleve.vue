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

  <Dialog header="Modifier un Eleve" v-model:visible="eleveDialog" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #content>
            <center><h1>Modifier un Eleve</h1></center>
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
import { Eleve, User } from '@/models';
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

const eleveDialog = ref(false);

const nouveauUtilisateur = ref<User>({
  email: '',
  roles: ['Eleve'],
  password: '',
});

const nouveauEleve = ref<Eleve>({
  id: '',
  nom: '',
  prenom: '',
  telephone: '',
  mailParent1: '',
  mailParent2: '',
  sexeEleve: '',
  user: '',
  etablissement: 1,
});

async function CreerEleve() {
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
    nouveauEleve.value.etablissement
  );
  alert('Votre Eleve à ete créer');
  displayBasic.value = false;
  await fetchElevesByAnneeAndEtablissement(1);
}

async function champsEleve(idEleve: number) {
  eleveDialog.value = true;
  await fetchEleveById(idEleve);
}

async function editEleve(idEleve: number) {
  await updateEleve(
    idEleve,
    eleveById.value.nom,
    eleveById.value.prenom,
    eleveById.value.mailParent1,
    eleveById.value.mailParent2,
    eleveById.value.telephone,
    eleveById.value.sexeEleve,
    eleveById.value.etablissement
  );
  await fetchElevesByAnneeAndEtablissement(3);
  alert('Votre Eleve à ete modifié');
  eleveDialog.value = false;
}

async function supprimerEleve(idEleve: number) {
  if (confirm('Voulez vous vraiment supprimer ?')) {
    await deleteEleve(idEleve);
    await fetchElevesByAnneeAndEtablissement(3);
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
  await fetchElevesByAnneeAndEtablissement(1);
});
</script>
