<template>
  <Dialog header="Ajouter un critère" v-model:visible="displayBasic" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #title>
            <InputText id="Title" v-model="nouveauCritere.titre" type="text" placeholder="Titre" />
          </template>
          <template #content>
            <Editor v-model="nouveauCritere.description" editorStyle="height: 130px" placeholder="Entrez vos critères">
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
              <InputText id="UrlVideo" v-model="nouveauCritere.url_video" type="text" placeholder="URL vidéo" />
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Image :</p>
              </div>
              <div class="col-9">
                <FileUpload
                  v-if="!imageCritereIsSelected"
                  v-model="nouveauCritere.image"
                  mode="basic"
                  accept="image/*"
                  :maxFileSize="1000000"
                  @select="onPhotoChange"
                  :showUploadButton="false"
                />
                <img
                  v-else
                  :src="`data:${nouvelleImageCritere.type};base64,` + nouveauCritere.image"
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
      <Button label="Yes" icon="pi pi-check" @click="addCritere" autofocus />
    </template>
  </Dialog>
  <Dialog header="Modifier un critère" v-model:visible="displayEdit" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #title>
            <InputText id="Title" v-model="nouveauCritere.titre" type="text" placeholder="Titre" />
          </template>
          <template #content>
            <Editor v-model="nouveauCritere.description" editorStyle="height: 130px" placeholder="Entrez vos critères">
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
              <InputText id="UrlVideo" v-model="nouveauCritere.url_video" type="text" placeholder="URL vidéo" />
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Image :</p>
              </div>
              <div class="col-9">
                <FileUpload
                  v-if="!imageCritereIsSelected"
                  v-model="nouveauCritere.image"
                  mode="basic"
                  accept="image/*"
                  :maxFileSize="1000000"
                  @select="onPhotoChange"
                  :showUploadButton="false"
                />
                <img
                  v-else
                  :src="`data:${nouvelleImageCritere.type};base64,` + nouveauCritere.image"
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
      <Button label="Annuler" icon="pi pi-times" @click="closeEdit" class="p-button-text" />
      <Button
        label="Ajouter des indicateurs"
        icon="pi pi-plus"
        @click="
          router.push({
            name: 'IndicateurAF',
            query: { idCritere: nouveauCritere.id },
          })
        "
      />
      <Button label="Modifier" icon="pi pi-check" @click="closeEdit(), editCritere(nouveauCritere)" autofocus> </Button>
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
        <p>{{ apsaRetenu.SituationEvaluation }}</p>
        <!-- <Textarea class="w-100" :disabled="true" v-model="apsaRetenu.SituationEvaluation" :autoResize="true" rows="5" /> -->
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col-3" v-for="monCritere in criteres" v-bind:key="monCritere.id">
          <Card>
            <template #title> {{ monCritere.titre }} </template>
            <template #content>
              <p v-html="monCritere.description" />
              <p v-html="monCritere.url_video" />
              <Button class="p-button-rounded p-button-info" @click="editCritere(monCritere)"
                ><i class="pi pi-pencil" @click="openEdit"
              /></Button>
              <Button class="p-button-rounded p-button-danger" @click="deleteCritere(monCritere.id)"
                ><i class="pi pi-times"
              /></Button>
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
    <div>
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
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import critere from '@/store/modules/critere';

const route = useRoute();
const router = useRouter();

const { isObjectEmpty } = ObjectUtils();
const { etablissement } = UtilisateurService();
const { saveCritere, fetchCriteres, criteres } = CritereService();
const { apsaRetenu, fetchApsaRetenu } = ApsaRetenuService();

const monTitleCritere = ref();
const nouvelleImageCritere = ref<File>({} as File);
const monUrlVideo = ref();
const isLoading = ref(false);
const mesCriteres = ref<Critere[]>([]);
const CritereByApsaRetenu = ref<Critere[]>([]);
const nouveauCritere = ref<Critere>({ titre: '', description: '', url_video: '', image: '', id: -1 } as Critere);

const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

const displayEdit = ref(false);
const openEdit = () => {
  displayEdit.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
};

const closeEdit = () => {
  displayEdit.value = false;
};

const imageCritereIsSelected = computed(() => {
  if (isObjectEmpty(nouvelleImageCritere.value) && nouveauCritere.value.image === '') return false;
  else return true;
});

async function addCritere() {
  try {
    const critere = await axios.post('https://localhost:8000/api/criteres', {
      titre: nouveauCritere.value.titre,
      description: nouveauCritere.value.description,
      image: nouveauCritere.value.image,
      urlVideo: nouveauCritere.value.url_video,
      apsaRetenu: '/api/apsa_retenus/' + route.query.idApsaRetenu?.toString(),
    });
    closeBasic();
  } catch (e) {
    console.log(e);
  }
}

async function editCritere(monCritere: Critere) {
  try {
    let indexCritere = mesCriteres.value.findIndex((a) => a.id === monCritere.id);
    mesCriteres.value.splice(indexCritere, 1);
    nouveauCritere.value = monCritere;
    const critere = await axios.put('https://localhost:8000/api/criteres/' + monCritere.id, {
      titre: monCritere.titre,
      description: monCritere.description,
      image: monCritere.image,
      urlVideo: monCritere.url_video,
    });
  } catch (e) {
    console.log(e);
  }
}

async function deleteCritere(id: number) {
  let x = window.confirm('Voulez vous vraiment supprimer ce critère ?');

  if (x) {
    const user = await axios.delete('https://localhost:8000/api/criteres/' + id);
  }
}

function resetCritere() {
  nouveauCritere.value = { titre: '', description: '', url_video: '', image: '' } as Critere;
}

function verif() {}

function toIndicateur() {
  router.push('IndicateurAF');
}

onMounted(async () => {
  if (route.query.idApsaRetenu) {
    await fetchCriteres();
    await fetchApsaRetenu(parseInt(route.query.idApsaRetenu.toString()));
    criteres.value.forEach((a) => {
      if (route.query.idApsaRetenu) {
        if (a.ApsaRetenu.id === parseInt(route.query.idApsaRetenu.toString())) {
          CritereByApsaRetenu.value.push(a);
        }
      }
    });
  }
});

function onPhotoChange(event: any) {
  nouvelleImageCritere.value = event.files[0];
  const reader = new FileReader();

  reader.addEventListener(
    'load',
    function () {
      const chainePhoto = reader.result as string;
      const chaineFinale = chainePhoto.replace(`data:${nouvelleImageCritere.value.type};base64,`, '');
      nouveauCritere.value.image = chaineFinale;
    },
    false
  );

  reader.readAsDataURL(nouvelleImageCritere.value);
}

function supprimerImageCritere() {
  nouvelleImageCritere.value = {} as File;
  nouveauCritere.value.image = '';
}
</script>
