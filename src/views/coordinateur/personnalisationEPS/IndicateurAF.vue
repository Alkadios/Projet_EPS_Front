<template>
  <Dialog header="Ajouter une carte" v-model:visible="displayBasic" :style="{ width: '50vw' }">
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
      <div v-if="critere" class="mb-3">
        <p>Titre du critère : {{ critere.titre }}</p>
        <p>Description : {{ critere.description }}</p>
        <!-- <Textarea class="w-100" :disabled="true" v-model="monCritere" :autoResize="true" rows="5" /> -->
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col-3" v-for="monIndicateur in mesIndicateurs" v-bind:key="monIndicateur.id">
          <Card>
            <template #title> {{ monIndicateur.libelle }} </template>
            <template #content>
              <p v-html="monIndicateur.description" />
              <Button class="p-button-rounded p-button-info" @click="EditIndicateur(monIndicateur)"
                ><i class="pi pi-pencil"
              /></Button>
              <Button class="p-button-rounded p-button-danger" @click="deleteIndicateur(monIndicateur.id)"
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
import { ref, onMounted } from 'vue';
import { Indicateur } from '@/models';
import UtilisateurService from '@/services/UtilisateurService';
import CritereService from '@/services/CritereService';
import { useRoute } from 'vue-router';

const route = useRoute();

const { etablissement } = UtilisateurService();
const { critere, fetchCritereById } = CritereService();
const nouveauIndicateur = ref<Indicateur>({ libelle: '', description: '', critere: '', url_video: '' } as Indicateur);
const isLoading = ref(false);
const mesIndicateurs = ref<Indicateur[]>([]);

const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
  resetIndicateur();
};

function EditIndicateur(monIndicateur: Indicateur) {
  let indexIndicateur = mesIndicateurs.value.findIndex((a) => a.id === monIndicateur.id);
  mesIndicateurs.value.splice(indexIndicateur, 1);
  nouveauIndicateur.value = monIndicateur;
  openBasic();
}

function addIndicateur() {
  nouveauIndicateur.value.id = mesIndicateurs.value.length + 1;
  mesIndicateurs.value.push(nouveauIndicateur.value);
  resetIndicateur();
  closeBasic();
}

function deleteIndicateur(id: number) {
  let indexIndicateur = mesIndicateurs.value.findIndex((a) => a.id === id);
  mesIndicateurs.value.splice(indexIndicateur, 1);
}

function resetIndicateur() {
  nouveauIndicateur.value = { libelle: '', description: '', critere: '', url_video: '' } as Indicateur;
}

function verif() {}

onMounted(async () => {
  isLoading.value = true;
  const idCritere = route.query.idCritere;
  if (idCritere && typeof idCritere === 'string') {
    fetchCritereById(parseInt(idCritere));
  }
  isLoading.value = false;
});
</script>
