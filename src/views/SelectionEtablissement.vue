<template>
  <Dialog id="modalSelectionEtablissement" :visible="afficherSelectionEtablissement" :modal="true" :closable="false">
    <template #header>
      <span v-if="userAvecEtablissement" class="titre">Choisissez un établissement</span>
      <span v-else class="titre">L'utilisateur n'a aucun établissement </span>
    </template>
    <Listbox
      v-if="userAvecEtablissement"
      v-model="etablissementSelectionne"
      :options="user.etablissements"
      optionLabel="nom"
      class="w-30rem"
      @change="selectionnerEtablissement"
    >
    </Listbox>
    <span v-else> Accès refusé</span>
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

const userAvecEtablissement = computed(() => {
  if (user.value.etablissements && user.value.etablissements.length > 0) return true;
  return false;
});

async function selectionnerEtablissement() {
  await fetchEtablissementById(etablissementSelectionne.value.id);
  afficherSelectionEtablissement.value = false;
}
</script>
