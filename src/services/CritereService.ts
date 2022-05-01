import { computed } from 'vue';
import { useStore } from 'vuex';
import { Critere } from '@/models';

export default function CritereService() {
  const store = useStore();

  const criteres = computed((): Critere[] => {
    return store.getters['CritereModule/getCriteres'];
  });
  async function fetchCriteres() {
    await store.dispatch('CritereModule/fetchCriteres');
  }

  const critere = computed((): Critere => {
    return store.getters['CritereModule/getCritere'];
  });
  async function saveCritere(
    id: string,
    titre: string,
    description: string,
    image: string,
    urlVideo: string,
    ApsaRetenu: string
  ) {
    await store.dispatch('CritereModule/saveCritere', { id, titre, description, image, urlVideo, ApsaRetenu });
  }
  async function fetchCritereById(idCritere: number) {
    await store.dispatch('CritereModule/fetchCritereById', idCritere);
  }

  const criteresByApsaRetenu = computed((): Critere[] => {
    return store.getters['CritereModule/getCriteresByApsaRetenu'];
  });
  async function fetchCriteresByApsaRetenu(idApsaRetenu: number) {
    await store.dispatch('CritereModule/fetchCritereByApsaRetenu', idApsaRetenu);
  }

  const criteresByAnneeApsaRetenuAndAfRetenu = computed((): Critere[] => {
    return store.getters['CritereModule/getCriteresByAnneeApsaRetenuAndAfRetenu'];
  });
  async function fetchCriteresByAnneeApsaRetenuAndAfRetenu(annee: number, idApsaRetenu: number, idAfRetenu: number) {
    await store.dispatch('CritereModule/fetchCriteresByAnneeApsaRetenuAndAfRetenu', {
      annee,
      idApsaRetenu,
      idAfRetenu,
    });
  }

  async function deleteCritere(idCritere: number) {
    await store.dispatch('CritereModule/deleteCritere');
  }
  return {
    criteres,
    fetchCriteres,
    critere,
    fetchCritereById,
    saveCritere,
    deleteCritere,
    fetchCriteresByApsaRetenu,
    criteresByApsaRetenu,
    fetchCriteresByAnneeApsaRetenuAndAfRetenu,
    criteresByAnneeApsaRetenuAndAfRetenu,
  };
}
