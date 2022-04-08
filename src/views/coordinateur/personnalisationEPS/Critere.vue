<template>
  <Dialog header="Ajouter une carte" v-model:visible="displayBasic" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #title>
            <InputText id="Title" v-model="monTitleIndicateur" type="text" placeholder="Titre" />
          </template>
          <template #content>
            <Editor v-model="maDescriptionIndicateur" editorStyle="height: 130px" placeholder="Entrez vos critères">
              <template v-slot:toolbar>
                <span class="ql-formats">
                  <button class="ql-list" value="bullet" type="button"></button>
                  <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
                  <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
                  <button class="ql-underline" v-tooltip.bottom="'Underline'"></button>
                </span>
              </template>
            </Editor>
            <div style="margin-top: 1.5rem">
              <InputText id="UrlVideo" v-model="monUrlVideo" type="text" placeholder="URL vidéo" />
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Image :</p>
              </div>
              <div class="col-9">
                <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" :maxFileSize="1000000" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="addIndicateur" autofocus />
    </template>
  </Dialog>
  <div class="card shadow-lg o-hidden border-0 my-5">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-10">
          <div class="p-5">
            <div class="text-center">
              <p class="text-dark mb-2">
                Personnalisation de l'équipe EPS <br />
                au
              </p>
              <h4 class="text-dark mb-4">{{ etablissement.nomEtablissement }}</h4>
            </div>
          </div>
        </div>
        <div class="mb-3"></div>
      </div>
      <div class="mb-3">
        <Textarea class="w-100" :disabled="true" value="TEST" :autoResize="true" rows="5" />
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col-3" v-for="monIndicateur in mesIndicateurs" v-bind:key="monIndicateur.id">
          <Card>
            <template #title> {{ monIndicateur.libelle }} </template>
            <template #content>
              <p v-html="monIndicateur.description" />
              <Button class="p-button-rounded p-button-danger" @click="deleteIndicateur(monIndicateur.id)"
                ><i class="pi pi-times"
              /></Button>
              <Button class="p-button-rounded p-button-info" @click="EditIndicateur(monIndicateur)"
                ><i class="pi pi-pencil"
              /></Button>
              <Button class="p-button-rounded p-button-info" @click="ToIndicateur()"><i class="pi pi-check" /></Button>
            </template>
          </Card>
        </div>
        <div class="col-3">
          <Card>
            <template #title> <p style="text-align: center">Ajouter un indicateur</p></template>
            <template #content>
              <p style="text-align: center">
                <i
                  class="pi pi-plus"
                  @click="openBasic"
                  style="cursor: pointer; font-size: 5rem; border-radius: 50%; border: 0.3rem solid"
                />
              </p>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col-2">
          <Button label="Terminer" icon="pi pi-check" @click="verif()" autofocus></Button>
        </div>
        <div class="col-3">
          <Button
            label="Retour aux AF"
            style="right: 1rem"
            icon="pi pi-check"
            @click="router.push('DeclinerAFRetenus')"
            autofocus
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Indicateur } from '@/models';
import UtilisateurService from '@/services/UtilisateurService';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();

let propertyDisable = ref(true);
const { etablissement } = UtilisateurService();
const maDescriptionIndicateur = ref();
const monTitleIndicateur = ref();
const monIamge = ref();
const monUrlVideo = ref();

const mesIndicateurs = ref<Indicateur[]>([]);

const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
};

function EditIndicateur(monIndicateur: Indicateur) {
  let indexIndicateur = mesIndicateurs.value.findIndex((a) => a.id === monIndicateur.id);
  mesIndicateurs.value.splice(indexIndicateur, 1);
  maDescriptionIndicateur.value = monIndicateur.description;
  monTitleIndicateur.value = monIndicateur.libelle;
  openBasic();
}

function addIndicateur() {
  let monNouvelObjet = {
    id: mesIndicateurs.value.length + 1,
    libelle: monTitleIndicateur.value,
    description: maDescriptionIndicateur.value,
  };
  mesIndicateurs.value.push(monNouvelObjet);
  monTitleIndicateur.value = '';
  maDescriptionIndicateur.value = '';
  closeBasic();
}

function deleteIndicateur(id: number) {
  let indexIndicateur = mesIndicateurs.value.findIndex((a) => a.id === id);
  mesIndicateurs.value.splice(indexIndicateur, 1);
}

function verif() {}

function ToIndicateur() {
  router.push('IndicateurAF');
}

onMounted(async () => {});
</script>
