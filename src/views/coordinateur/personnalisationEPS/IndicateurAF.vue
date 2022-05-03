<template>
  <Dialog header="Ajouter un indicateur" v-model:visible="displayBasic" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #title>
            <InputText id="Title" v-model="nouveauIndicateur.libelle" type="text" placeholder="Titre" />
          </template>
          <template #content>
            <Editor
              v-model="nouveauIndicateur.description"
              editorStyle="height: 130px"
              placeholder="Entrez la description de l'indicateur"
            >
              <template v-slot:toolbar>
                <span class="ql-formats">
                  <button class="ql-list" value="bullet" type="button"></button>
                  <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
                  <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
                  <button class="ql-underline" v-tooltip.bottom="'Underline'"></button>
                </span>
              </template>
            </Editor>
            <div>
              <InputText id="UrlVideo" v-model="nouveauIndicateur.url_video" type="text" placeholder="URL vidéo" />
            </div>
            <div style="margin-top: 1.5rem">
              <p>Couleur:</p>
              <ColorPicker v-model="nouveauIndicateur.color" defaultColor="#FF0000" />
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Image :</p>
              </div>
              <div class="col-9">
                <FileUpload
                  v-if="!imageIndicateurIsSelected"
                  v-model="nouveauIndicateur.image"
                  mode="basic"
                  accept="image/*"
                  :maxFileSize="1000000"
                  @select="onPhotoChange"
                  :showUploadButton="false"
                />
                <img
                  v-else
                  :src="`data:${nouvelleImageIndicateur.type};base64,` + nouveauIndicateur.image"
                  style="max-width: 10rem; max-height: 10rem"
                  alt="Logo organisme"
                />
                <Button
                  v-if="imageIndicateurIsSelected"
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger"
                  @click="supprimerImageIndicateur"
                />
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
  <Dialog header="Modifier un indicateur" v-model:visible="displayEdit" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #title>
            <InputText id="Title" v-model="nouveauIndicateur.libelle" type="text" placeholder="Titre" />
          </template>
          <template #content>
            <Editor
              v-model="nouveauIndicateur.description"
              editorStyle="height: 130px"
              placeholder="Entrez vos critères"
            >
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
              <InputText id="UrlVideo" v-model="nouveauIndicateur.url_video" type="text" placeholder="URL vidéo" />
            </div>
            <div style="margin-top: 1.5rem">
              <p>Couleur:</p>
              <ColorPicker v-model="nouveauIndicateur.color" />
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Image :</p>
              </div>
              <div class="col-9">
                <FileUpload
                  v-if="!imageIndicateurIsSelected"
                  v-model="nouveauIndicateur.image"
                  mode="basic"
                  accept="image/*"
                  :maxFileSize="1000000"
                  @select="onPhotoChange"
                  :showUploadButton="false"
                />
                <img
                  v-else
                  :src="`data:${nouvelleImageIndicateur.type};base64,` + nouveauIndicateur.image"
                  style="max-width: 10rem; max-height: 10rem"
                  alt="Logo organisme"
                />
                <Button
                  v-if="imageIndicateurIsSelected"
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger"
                  @click="supprimerImageIndicateur"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <template #footer>
      <Button label="Annuler" icon="pi pi-times" @click="closeEdit" class="p-button-text" />
      <Button label="Modifier" icon="pi pi-check" @click="closeEdit(), changeIndicateur(nouveauIndicateur)" autofocus>
      </Button>
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
              <h4 class="text-dark mb-4">{{ etablissement.nom }}</h4>
            </div>
          </div>
        </div>
        <div class="mb-3"></div>
      </div>
      <div v-if="critere" class="mb-3">
        <p>Titre du critère : {{ critere.titre }}</p>
        <p>Description : {{ critere.description }}</p>
        <!-- <Textarea class="w-100" :disabled="true" v-model="monCritere" :autoResize="true" rows="5" /> -->
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col-3" v-for="monIndicateur in indicateurs" v-bind:key="monIndicateur.id">
          <Card>
            <template #title> {{ monIndicateur.libelle }} </template>
            <template #content>
              <p v-html="monIndicateur.description" />
              <Button class="p-button-rounded p-button-info" @click="openEdit(monIndicateur)"
                ><i class="pi pi-pencil"
              /></Button>
              <Button class="p-button-rounded p-button-danger" @click="removeIndicateur(monIndicateur.id)"
                ><i class="pi pi-times"
              /></Button>
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
      <Button label="Valider" style="right: 1rem" icon="pi pi-check" @click="verif()" autofocus></Button>
      <Button
        label="Retour aux critères"
        icon="pi pi-backward"
        style="left: 1rem"
        @click="router.push('Critere')"
        autofocus
      ></Button>
    </div>
    <div style="position: fixed; bottom: 0; right: 0">
      <ProgressSpinner
        v-if="isLoading"
        style="float: right; width: 50px; height: 50px"
        strokeWidth="8"
        animationDuration=".5s"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { Indicateur } from '@/models';
import UtilisateurService from '@/services/UtilisateurService';
import CritereService from '@/services/CritereService';
import IndicateurService from '@/services/IndicateurService';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { isObject } from '@vue/shared';
import ColorPicker from 'primevue/colorpicker';

const route = useRoute();
const router = useRouter();

const { etablissement } = UtilisateurService();
const { critere, fetchCriteres, fetchCritereById } = CritereService();
const { saveIndicateur, deleteIndicateur, editIndicateur, fetchIndicateurs, indicateurs } = IndicateurService();
const IndicateurByCritere = ref<Indicateur[]>([]);
const nouvelleImageIndicateur = ref<File>({} as File);
const nouveauIndicateur = ref<Indicateur>({
  libelle: '',
  description: '',
  url_video: '',
  color: '',
  id: -1,
} as Indicateur);
const isLoading = ref(false);
const mesIndicateurs = ref<Indicateur[]>([]);

const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
  window.location.reload();
};

const displayEdit = ref(false);
function openEdit(monIndicateur: Indicateur) {
  displayEdit.value = true;
  nouveauIndicateur.value = monIndicateur;
}

const closeEdit = () => {
  displayEdit.value = false;
  window.location.reload();
  window.alert('L\indicateur a bien été modifié !');
};

async function addIndicateur() {
  try {
    await saveIndicateur(
      nouveauIndicateur.value['@id'],
      nouveauIndicateur.value.libelle,
      nouveauIndicateur.value.description,
      nouveauIndicateur.value.image,
      nouveauIndicateur.value.url_video,
      nouveauIndicateur.value.color,
      critere.value['@id']
    );
    closeBasic();
    window.alert("L'indicateur a bien été ajouté !");
  } catch (e) {
    console.log(e);
  }
}

async function changeIndicateur(monIndicateur: Indicateur) {
  try {
    await editIndicateur(
      monIndicateur.id,
      monIndicateur.libelle,
      monIndicateur.description,
      monIndicateur.image,
      monIndicateur.url_video,
      monIndicateur.color
    );
  } catch (e) {
    console.log(e);
  }
}

async function removeIndicateur(indicateurId: number) {
  let x = window.confirm('Voulez vous vraiment supprimer cet indicateur ?');
  if (x) {
    try {
      await deleteIndicateur(indicateurId);
      window.alert("L'indicateur a bien été supprimé !");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }
}

function resetIndicateur() {
  nouveauIndicateur.value = { libelle: '', description: '', url_video: '' } as Indicateur;
}

const imageIndicateurIsSelected = computed(() => {
  if (!isObject(nouvelleImageIndicateur.value) && nouveauIndicateur.value.image === '') return false;
  else return true;
});

function verif() {}

onMounted(async () => {
  isLoading.value = true;
  if (route.query.idCritere) {
    await fetchIndicateurs();
    await fetchCritereById(parseInt(route.query.idCritere.toString()));
  }
  isLoading.value = false;
});

function onPhotoChange(event: any) {
  nouvelleImageIndicateur.value = event.files[0];
  const reader = new FileReader();

  reader.addEventListener(
    'load',
    function () {
      const chainePhoto = reader.result as string;
      const chaineFinale = chainePhoto.replace(`data:${nouvelleImageIndicateur.value.type};base64,`, '');
      nouveauIndicateur.value.image = chaineFinale;
    },
    false
  );

  reader.readAsDataURL(nouvelleImageIndicateur.value);
}

function supprimerImageIndicateur() {
  nouvelleImageIndicateur.value = {} as File;
  nouveauIndicateur.value.image = '';
}
</script>
