<template>
  <Dialog header="Ajouter un indicateur" v-model:visible="displayBasic" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #title>
            <p class="text-center">Entrez les informations</p>
          </template>
          <template #content>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Titre :</p>
              </div>
              <div class="col-9">
                <InputText id="Title" v-model="nouveauIndicateur.libelle" type="text" placeholder="Titre" />
              </div>
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Description :</p>
              </div>
              <div class="col-9">
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
              </div>
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Vidéo :</p>
              </div>
              <div class="col-9">
                <InputText id="UrlVideo" v-model="nouveauIndicateur.url_video" type="text" placeholder="URL vidéo" />
              </div>
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Couleur:</p>
              </div>
              <div class="col-9">
                <Button
                  class="p-button-sm p-button-raised p-button-rounded"
                  style="min-width: unset; background-color: #ff1300"
                  @click="nouveauIndicateur.color = 'ff1300'"
                />
                <Button
                  class="p-button-sm p-button-raised p-button-rounded"
                  style="min-width: unset; background-color: #fffe00"
                  @click="nouveauIndicateur.color = 'fffe00'"
                />
                <Button
                  class="p-button-sm p-button-raised p-button-rounded"
                  style="min-width: unset; background-color: #98ff00"
                  @click="nouveauIndicateur.color = '98ff00'"
                />
                <Button
                  class="p-button-sm p-button-raised p-button-rounded"
                  style="min-width: unset; background-color: #3c6500"
                  @click="nouveauIndicateur.color = '3c6500'"
                />
                <ColorPicker
                  format="hex"
                  v-model="nouveauIndicateur.color"
                  defaultColor="#FF0000"
                  style="min-width: unset"
                />
              </div>
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
      <Button label="Annuler" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
      <Button label="Ajouter" icon="pi pi-check" @click="addIndicateur" autofocus />
    </template>
  </Dialog>
  <Dialog header="Modifier un indicateur" v-model:visible="displayEdit" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #title>
            <p class="text-center">Entrez les informations</p>
          </template>
          <template #content>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Titre :</p>
              </div>
              <div class="col-9">
                <InputText id="Title" v-model="nouveauIndicateur.libelle" type="text" placeholder="Titre" />
              </div>
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Description :</p>
              </div>
              <div class="col-9">
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
              </div>
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Vidéo</p>
              </div>
              <div class="col-9">
                <InputText id="UrlVideo" v-model="nouveauIndicateur.url_video" type="text" placeholder="URL vidéo" />
              </div>
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Couleur:</p>
              </div>
              <div class="col-9">
                <Button
                  class="p-button-sm p-button-raised p-button-rounded"
                  style="min-width: unset; background-color: #ff1300"
                  @click="nouveauIndicateur.color = 'ff1300'"
                />
                <Button
                  class="p-button-sm p-button-raised p-button-rounded"
                  style="min-width: unset; background-color: #fffe00"
                  @click="nouveauIndicateur.color = 'fffe00'"
                />
                <Button
                  class="p-button-sm p-button-raised p-button-rounded"
                  style="min-width: unset; background-color: #98ff00"
                  @click="nouveauIndicateur.color = '98ff00'"
                />
                <Button
                  class="p-button-sm p-button-raised p-button-rounded"
                  style="min-width: unset; background-color: #3c6500"
                  @click="nouveauIndicateur.color = '3c6500'"
                />
                <ColorPicker
                  format="hex"
                  v-model="nouveauIndicateur.color"
                  defaultColor="#FF0000"
                  style="min-width: unset"
                />
              </div>
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
  <div class="card shadow-lg o-hidden border-0 m-5">
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
        <strong>Titre du critère : </strong>
        <p>{{ critere.titre }}</p>
        <strong>Description du critère</strong>
        <p v-html="critere.description" />
        <!-- <Textarea class="w-100" :disabled="true" v-model="monCritere" :autoResize="true" rows="5" /> -->
      </div>
    </div>
    <div class="card container">
      <OrderList v-model="mesIndicateurs" listStyle="height:auto" dataKey="id">
        <template #header> Listes des indicateur </template>
        <template #item="nouveauIndicateur">
          <div class="container col-12 text-white">
            <div class="p-3 row" :style="'background-color: ' + nouveauIndicateur.item.color + '; border-radius: 10px'">
              <div class="col-11">
                <strong class="mb-2">Titre: {{ nouveauIndicateur.item.libelle }}</strong>
                <hr class="text-black" />
                <strong
                  >Description:
                  <p v-html="nouveauIndicateur.item.description"></p
                ></strong>
                <strong v-if="nouveauIndicateur.item.url_video != ''"
                  >Vidéo:
                  <a :href="nouveauIndicateur.item.url_video" target="blank">{{
                    nouveauIndicateur.item.url_video
                  }}</a></strong
                ><br />
                <strong v-if="nouveauIndicateur.item.image != ''"
                  >Image:<br /><img
                    :src="`data:${nouvelleImageIndicateur.type};base64,` + nouveauIndicateur.item.image"
                    style="max-width: 10rem; max-height: 10rem" /></strong
                ><br />
              </div>
              <div class="col-1 align-center mt-5">
                <Button class="p-button-rounded p-button-info" @click="openEdit(nouveauIndicateur.item)">
                  <i class="pi pi-pencil" />
                </Button>
                <Button class="p-button-rounded p-button-danger" @click="removeIndicateur(nouveauIndicateur.item.id)">
                  <i class="pi pi-trash" />
                </Button>
              </div>
            </div>
          </div>
        </template>
      </OrderList>
    </div>
    <button
      class="btn"
      style="border-radius: 10px; background-color: #6372e6; color: white; margin: 1rem"
      @click="openBasic"
    >
      <i class="m-3 pi pi-plus" style="cursor: pointer; border-radius: 50%; border: 0.2rem solid; font-size: 2em" />
      <p>Ajouter un indicateur</p>
    </button>
    <div class="container-fluid text-center mb-10 Pl-10">
      <Button
        label="Enregistrer les indicateurs"
        style="right: 1rem"
        icon="pi pi-check"
        @click="onValid(false)"
        autofocus
      ></Button>
      <Button label="Retour aux critères" icon="pi pi-backward" style="left: 1rem" autofocus @click="back()"></Button>
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
import { Indicateur } from '@/models';
import UtilisateurService from '@/services/UtilisateurService';
import CritereService from '@/services/CritereService';
import IndicateurService from '@/services/IndicateurService';
import { useRoute, useRouter } from 'vue-router';
import ObjectUtils from '@/utils/ObjectUtils';
import { cloneDeep } from 'lodash-es';
import UserService from '@/services/UserService';
import Role from '@/constants/Role';

const { user, redirectToHomePage } = UserService();
const route = useRoute();
const router = useRouter();
const { isObjectEmpty } = ObjectUtils();
const { etablissement } = UtilisateurService();
const { critere, fetchCriteres, fetchCritereById } = CritereService();
const {
  saveIndicateur,
  deleteIndicateur,
  editIndicateur,
  fetchIndicateurs,
  fetchIndicateursByCritere,
  indicateurs,
  indicateur,
  indicateursByCritere,
} = IndicateurService();
const IndicateurByCritere = ref<Indicateur[]>([]);
const nouvelleImageIndicateur = ref<File>({} as File);
const nouveauIndicateur = ref<Indicateur>({
  libelle: '',
  description: '',
  url_video: '',
  color: '',
  image: '',
  id: -1,
} as Indicateur);
const isLoading = ref(false);
const mesIndicateurs = ref<Indicateur[]>([]);

const displayBasic = ref(false);
const openBasic = () => {
  resetIndicateur();
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
};

const displayEdit = ref(false);
function openEdit(monIndicateur: Indicateur) {
  displayEdit.value = true;
  nouveauIndicateur.value = monIndicateur;
}

const closeEdit = () => {
  displayEdit.value = false;
  window.alert('L\indicateur a bien été modifié !');
};

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (!user.value.roles.includess(Role.ADMIN)) {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    if (route.query.idCritere) {
      await fetchIndicateursByCritere(parseInt(route.query.idCritere.toString()));
      await fetchCritereById(parseInt(route.query.idCritere.toString()));
      mesIndicateurs.value = cloneDeep(indicateursByCritere.value);
    }
    isLoading.value = false;
  }
});

async function addIndicateur() {
  await saveIndicateur(
    nouveauIndicateur.value['@id'],
    nouveauIndicateur.value.libelle,
    nouveauIndicateur.value.description,
    nouveauIndicateur.value.image,
    nouveauIndicateur.value.url_video,
    '#' + nouveauIndicateur.value.color,
    critere.value['@id']
  );
  mesIndicateurs.value.push(indicateur.value);
  closeBasic();
  window.alert("L'indicateur a bien été ajouté !");
}

async function changeIndicateur(monIndicateur: Indicateur) {
  await editIndicateur(
    monIndicateur.id,
    monIndicateur.libelle,
    monIndicateur.description,
    monIndicateur.image,
    monIndicateur.url_video,
    monIndicateur.color
  );
  const index = mesIndicateurs.value.findIndex((i) => i.id === monIndicateur.id);
  mesIndicateurs.value[index] = monIndicateur;
}

async function removeIndicateur(indicateurId: number) {
  let x = window.confirm('Voulez vous vraiment supprimer cet indicateur ?');
  if (x) {
    await deleteIndicateur(indicateurId);
    mesIndicateurs.value = mesIndicateurs.value.filter((i: Indicateur) => i.id != indicateurId);
    window.alert("L'indicateur a bien été supprimé !");
  }
}

function resetIndicateur() {
  nouveauIndicateur.value = { libelle: '', description: '', url_video: '', image: '' } as Indicateur;
}

const imageIndicateurIsSelected = computed(() => {
  if (isObjectEmpty(nouvelleImageIndicateur.value) && nouveauIndicateur.value.image === '') return false;
  else return true;
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
async function onValid(redirectToCritere: boolean) {
  mesIndicateurs.value.forEach(async (i: Indicateur, index) => {
    await editIndicateur(i.id, i.libelle, i.description, i.image, i.url_video, i.color, index + 1);
  });
  // if (redirectToCritere) {
  //   const splitApsaRetenu = critere.value.ApsaRetenu.toString().split('/');
  //   router.push({ name: 'Critere', query: { idApsaRetenu: splitApsaRetenu[3] } });
  // } else {
  //   router.push({ name: 'TableauDeBordConfig' });
  //}
}

function back() {
  window.history.back();
}
</script>
