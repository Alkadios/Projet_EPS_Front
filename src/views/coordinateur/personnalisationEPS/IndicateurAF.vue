<template>
  <Dialog header="Ajouter une carte" v-model:visible="displayBasic" :style="{ width: '50vw' }">
    <div class="row" style="place-content: center">
      <div class="col-8">
        <Card>
          <template #title>
            <InputText id="Title" type="text" placeholder="Titre" />
          </template>
          <template #content>
            <Editor v-model="value2" editorStyle="height: 130px" placeholder="Entrez vos critères">
              <template v-slot:toolbar>
                <span class="ql-formats">
                  <button class="ql-list" value="bullet" type="button"></button>
                  <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
                  <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
                  <button class="ql-underline" v-tooltip.bottom="'Underline'"></button>
                </span>
              </template>
            </Editor>
          </template>
        </Card>
      </div>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="closeBasic" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="closeBasic" autofocus />
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
              <h4 class="text-dark mb-4">{{ NomEtablissement }}</h4>
            </div>
          </div>
        </div>
        <div class="mb-3"></div>
      </div>
      <div class="mb-3">
        <Textarea class="w-100" :disabled="propertyDisable" v-model="monCritere" :autoResize="true" rows="5" />
        <Button label="Edit" icon="pi pi-pencil" style="float: right" @click="propertyDisable = !propertyDisable" />
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col-3">
          <Card>
            <template #title> Advanced Card </template>
            <template #content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                numquam deserunt quisquam repellat.
              </p>
            </template>
          </Card>
        </div>
        <div class="col-3">
          <Card>
            <template #title> Advanced Card </template>
            <template #content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                numquam deserunt quisquam repellat.
              </p>
            </template>
          </Card>
        </div>
        <div class="col-3">
          <Card>
            <template #title> Advanced Card </template>
            <template #content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                numquam deserunt quisquam repellat.
              </p>
            </template>
          </Card>
        </div>
        <div class="col-3">
          <Card>
            <template #title> Advanced Card </template>
            <template #content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                numquam deserunt quisquam repellat.
              </p>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
let propertyDisable = ref(true);
const NomEtablissement = 'Lycée Professionnel de St Joseph';
const value2 = ref();
const monCritere = ref('Text déjà écrit');

const displayBasic = ref(false);
const openBasic = () => {
  displayBasic.value = true;
};

const closeBasic = () => {
  displayBasic.value = false;
  console.log(value2.value);
};

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    propertyDisable.value = true;
  }
});

function verif() {}

onMounted(async () => {});
</script>
