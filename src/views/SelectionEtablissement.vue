<template>
  <Dialog id="modalSelectionEtablissement" :visible="afficherSelectionEtablissement" :modal="true" :closable="false">
    <template #header>
      <span class="titre">Choisissez un établissement</span>
    </template>
    <Listbox
      v-model="etablissementSelectionne"
      :options="user.etablissements"
      optionLabel="nom"
      class="w-30rem"
      @change="selectionnerEtablissement"
    >
    </Listbox>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, ref, WritableComputedRef } from 'vue';
import ObjectUtils from '@/utils/ObjectUtils';
import UtilisateurService from '@/services/UtilisateurService';
import UserService from '@/services/UserService';
import type { Etablissement } from '@/models';

const props = defineProps({
  afficherSelectionEtablissement: Boolean,
});

const { isObjectEmpty } = ObjectUtils();

const { etablissement, fetchEtablissementById } = UtilisateurService();
const { user } = UserService();

const emit = defineEmits<{
  (e: 'update:afficherSelectionEtablissement', p: boolean): void;
}>();

const afficherSelectionEtablissement: WritableComputedRef<boolean> = computed({
  get(): boolean {
    return props.afficherSelectionEtablissement;
  },
  set(nouvelleValeur: boolean): void {
    emit('update:afficherSelectionEtablissement', nouvelleValeur);
  },
});

const afficherErreurAucunOrganisme = ref(false);
const etablissementSelectionne = ref<Etablissement>(etablissement.value);

async function selectionnerEtablissement() {
  await fetchEtablissementById(etablissementSelectionne.value.id);
  afficherSelectionEtablissement.value = false;
}
</script>
