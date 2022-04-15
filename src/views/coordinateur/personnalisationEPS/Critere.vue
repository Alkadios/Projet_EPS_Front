<template>
  <Dialog header="Ajouter un indicateur" v-model:visible="displayBasic" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #title>
            <InputText id="Title" v-model="monTitleCritere" type="text" placeholder="Titre" />
          </template>
          <template #content>
            <Editor v-model="maDescriptionCritere" editorStyle="height: 130px" placeholder="Entrez vos critères">
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
                <FileUpload
                  v-if="!imageCritereIsSelected"
                  v-model="imageCritere"
                  mode="basic"
                  accept="image/*"
                  :maxFileSize="1000000"
                  @select="onPhotoChange"
                  :showUploadButton="false"
                />
                <img
                  v-else
                  :src="`data:${nouvelleImageCritere.type};base64,` + imageCritere"
                  style="max-width: 10rem; max-height: 10rem"
                  alt="Logo organisme"
                />
                <Button
                  v-if="imageCritereIsSelected"
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger"
                  @click="supprimerImageCritere"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
      <Button label="Oui" icon="pi pi-check" @click="AddCritere" autofocus />
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
        <div class="mb-3">
          <div class="p-3">
            <label style="margin-left: 1rem" for="situation-evaluation"
              >Description de la situation d'évaluation :</label
            >
          </div>
        </div>
      </div>
      <div class="mb-3">
        <p>{{ apsaRetenu.SituationEvaluation }}</p>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col-3" v-for="monCritere in criteresByApsaRetenu" v-bind:key="monCritere['@id']">
          <Card>
            <template #title> {{ monCritere.titre }} </template>
            <template #content>
              <div v-if="monCritere.image != ''">
                <img
                  :src="`data:${nouvelleImageCritere.type};base64,` + monCritere.image"
                  style="max-width: 100%"
                  alt="Image critère"
                />
              </div>
              <p v-html="monCritere.description" />
              <div v-if="monCritere.url_video != null" style="margin-top: 1.5rem">
                <a :href="monCritere.url_video"
                  ><p>{{ monCritere.url_video }}</p></a
                >
              </div>
              <Button class="p-button-rounded p-button-danger" @click="deleteCritere(monCritere.id)"
                ><i class="pi pi-times"
              /></Button>
              <Button class="p-button-rounded p-button-info"><i class="pi pi-pencil" /></Button>
              <Button class="p-button-rounded p-button-info" @click="toIndicateur()"><i class="pi pi-check" /></Button>
            </template>
          </Card>
        </div>
        <div class="col-3">
          <Card>
            <template #title> <p style="text-align: center">Ajouter un critère</p></template>
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
      <Button label="Terminer" icon="pi pi-check" @click="verif()" autofocus></Button>
      <Button
        label="Retour aux AF"
        icon="pi pi-check"
        style="left: 1rem"
        @click="router.push('DeclinerAFRetenus')"
        autofocus
      ></Button>
    </div>
    <div style="position: fixed; bottom: 0; right: 2rem">
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
import { Critere } from '@/models';
import CritereService from '@/services/CritereService';
import ObjectUtils from '@/utils/ObjectUtils';
import UtilisateurService from '@/services/UtilisateurService';
import ApsaRetenuService from '@/services/ApsaRetenuService';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();

const { isObjectEmpty } = ObjectUtils();
const { etablissement } = UtilisateurService();
const { saveCritere, fetchCriteres, deleteCritere, fetchCriteresByApsaRetenu, criteresByApsaRetenu } = CritereService();
const { apsaRetenu, fetchApsaRetenu } = ApsaRetenuService();

const maDescriptionCritere = ref();
const monTitleCritere = ref();
const nouvelleImageCritere = ref<File>({} as File);
const imageCritere = ref('');
const monUrlVideo = ref();
const isLoading = ref(false);

const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
};

const imageCritereIsSelected = computed(() => {
  if (isObjectEmpty(nouvelleImageCritere.value) && imageCritere.value === '') return false;
  else return true;
});

async function AddCritere() {
  if (route.query.idApsaRetenu) {
    await saveCritere(
      monTitleCritere.value,
      maDescriptionCritere.value,
      imageCritere.value,
      monUrlVideo.value,
      '/api/apsa_retenus/' + route.query.idApsaRetenu?.toString()
    );
  }
  closeBasic();
}

function verif() {}

function toIndicateur() {
  router.push('IndicateurAF');
}

onMounted(async () => {
  isLoading.value = true;
  if (route.query.idApsaRetenu) {
    await fetchApsaRetenu(parseInt(route.query.idApsaRetenu.toString()));
    await fetchCriteresByApsaRetenu(parseInt(route.query.idApsaRetenu.toString()));
  }
  isLoading.value = false;
});

function onPhotoChange(event: any) {
  nouvelleImageCritere.value = event.files[0];
  const reader = new FileReader();

  reader.addEventListener(
    'load',
    function () {
      const chainePhoto = reader.result as string;
      const chaineFinale = chainePhoto.replace(`data:${nouvelleImageCritere.value.type};base64,`, '');
      imageCritere.value = chaineFinale;
    },
    false
  );

  reader.readAsDataURL(nouvelleImageCritere.value);
}
function supprimerImageCritere() {
  nouvelleImageCritere.value = {} as File;
  imageCritere.value = '';
}
</script>
