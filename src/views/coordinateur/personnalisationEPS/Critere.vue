<template>
  <Dialog header="Ajouter un critère" v-model:visible="displayBasic" :style="{ width: '50vw' }">
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
                <InputText id="Title" v-model="nouveauCritere.titre" type="text" placeholder="Titre" />
              </div>
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Description :</p>
              </div>
              <div class="col-9">
                <Editor
                  v-model="nouveauCritere.description"
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
                <p>Vidéo :</p>
              </div>
              <div class="col-9">
                <InputText id="UrlVideo" v-model="nouveauCritere.url_video" type="text" placeholder="URL vidéo" />
              </div>
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
      <Button label="Annuler" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
      <Button label="Ajouter" icon="pi pi-check" @click="addCritere" autofocus />
    </template>
  </Dialog>
  <Dialog header="Modifier un critère" v-model:visible="displayEdit" :style="{ width: '50vw' }">
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
                <InputText id="Title" v-model="nouveauCritere.titre" type="text" placeholder="Titre" />
              </div>
            </div>
            <div class="row" style="margin-top: 1.5rem">
              <div class="col-3">
                <p>Description :</p>
              </div>
              <div class="col-9">
                <Editor
                  v-model="nouveauCritere.description"
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
                <p>Vidéo :</p>
              </div>
              <div class="col-9">
                <InputText id="UrlVideo" v-model="nouveauCritere.url_video" type="text" placeholder="URL vidéo" />
              </div>
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
      <Button label="Modifier" icon="pi pi-check" @click="closeEdit(), changeCritere(nouveauCritere)" autofocus>
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
      <div class="mb-3">
        <p>Situation d'évaluation: {{ apsaRetenu.SituationEvaluation }}</p>
        <!-- <Textarea class="w-100" :disabled="true" v-model="apsaRetenu.SituationEvaluation" :autoResize="true" rows="5" /> -->
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col-3" v-for="monCritere in criteresByApsaRetenu" v-bind:key="monCritere.id">
          <Card>
            <template #title>{{ monCritere.titre }} </template>
            <template #content>
              <strong
                >Description:
                <p v-html="monCritere.description"></p></strong
              ><strong v-if="monCritere.url_video != ''"
                >Vidéo: <a :href="monCritere.url_video" target="blank">{{ monCritere.url_video }}</a></strong
              ><br />
              <strong v-if="monCritere.image != ''"
                >Image:<br /><img
                  :src="`data:${nouvelleImageCritere.type};base64,` + monCritere.image"
                  style="max-width: 10rem; max-height: 10rem" /></strong
              ><br />

              <Button
                label="Indicateur"
                icon="pi pi-plus"
                @click="
                  router.push({
                    name: 'IndicateurAF',
                    query: { idCritere: monCritere.id },
                  })
                "
              />
              <Button class="p-button-rounded p-button-info"
                ><i class="pi pi-pencil" @click="openEdit(monCritere)"
              /></Button>
              <Button class="p-button-rounded p-button-danger" @click="removeCritere(monCritere.id)"
                ><i class="pi pi-trash"
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
      <Button label="Terminer la configuration" icon="pi pi-check" autofocus 
        @click="
          router.push({
          name: 'TableauDeBordConfig'
        }), toastReturnDashBoard()"
        >
      </Button>
      <Button label="Retour aux AF" icon="pi pi-backward" style="left: 1rem" @click="back()" autofocus></Button>
      <div class="mb-3"><h6 style="float: right;">Critères d'évaluation</h6></div>
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
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Role from '@/constants/Role';
import ObjectUtils from '@/utils/ObjectUtils';
import CritereService from '@/services/CritereService';
import UtilisateurService from '@/services/UtilisateurService';
import ApsaRetenuService from '@/services/ApsaRetenuService';
import UserService from '@/services/UserService';
import type { Critere } from '@/models';

const toast = useToast();
const route = useRoute();
const router = useRouter();
const { isObjectEmpty } = ObjectUtils();
const { user, redirectToHomePage } = UserService();
const { etablissement } = UtilisateurService();
const { saveCritere, fetchCriteres, fetchCriteresByApsaRetenu, deleteCritere, editCritere, criteresByApsaRetenu } =
  CritereService();
const { apsaRetenu, fetchApsaRetenu } = ApsaRetenuService();

const nouvelleImageCritere = ref<File>({} as File);
const isLoading = ref(false);
const nouveauCritere = ref<Critere>({ titre: '', description: '', url_video: '', image: '' } as Critere);

const displayBasic = ref(false);
const openBasic = () => {
  resetCritere();
  displayBasic.value = true;
};

const displayEdit = ref(false);
function openEdit(monCritere: Critere) {
  displayEdit.value = true;
  nouveauCritere.value = monCritere;
}

const closeBasic = () => {
  displayBasic.value = false;
};

const closeEdit = () => {
  displayEdit.value = false;
  toast.add({ severity: 'success', summary: 'Succès', detail: `Le critère a bien été modifié !`, life: 4000 });
};

const imageCritereIsSelected = computed(() => {
  if (isObjectEmpty(nouvelleImageCritere.value) && nouveauCritere.value.image === '') return false;
  else return true;
});

onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else if (!user.value.roles.includes(Role.ADMIN)) {
    redirectToHomePage();
  } else {
    isLoading.value = true;
    if (route.query.idApsaRetenu) {
      await fetchCriteresByApsaRetenu(parseInt(route.query.idApsaRetenu.toString()));
      await fetchApsaRetenu(parseInt(route.query.idApsaRetenu.toString()));
    }
    isLoading.value = false;
  }
});

async function addCritere() {
  await saveCritere(
    nouveauCritere.value.titre,
    nouveauCritere.value.description,
    nouveauCritere.value.image,
    nouveauCritere.value.url_video,
    apsaRetenu.value['@id']
  );
  closeBasic();
  toast.add({ severity: 'success', summary: 'Succès', detail: `Le critère a bien été ajouté !`, life: 4000 });
}

async function changeCritere(monCritere: Critere) {
  await editCritere(monCritere.id, monCritere.titre, monCritere.description, monCritere.image, monCritere.url_video);
}

async function removeCritere(critereId: number) {
  let x = window.confirm('Voulez vous vraiment supprimer ce critère ?');
  if (x) {
    await deleteCritere(critereId);
    toast.add({ severity: 'success', summary: 'Succès', detail: `Le critère a bien été supprimé !`, life: 4000 });
  }
}

function resetCritere() {
  nouveauCritere.value = { titre: '', description: '', url_video: '', image: '' } as Critere;
}

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

function back() {
  window.history.back();
}

function toastReturnDashBoard(){
  toast.add({ severity: 'success', summary: 'Succès', detail: `La configuration a bien été enregistrée ! Vous avez été redirigé vers le tableau de configuration.`, life: 4000 });
}
</script>
