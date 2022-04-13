import { computed } from 'vue';
import { useStore } from 'vuex';
import { Critere } from '@/models';

export default function CritereService() {
  const store = useStore();

  const criteres = computed((): Critere[] => {
    return store.getters['CritereModule/getCriteres'];
  });
  async function fetchCriteres() {
    console.log('Service');
    await store.dispatch('CritereModule/fetchCriteres');
  }
  async function saveCritere(titre: string, description: string, image: string, urlVideo: string, ApsaRetenu: string) {
    await store.dispatch('CritereModule/saveCritere', { titre, description, image, urlVideo, ApsaRetenu });
  }
  async function deleteCritere(idCritere: number) {
    await store.dispatch('CritereModule/deleteCritere');
  }
  return {
    criteres,
    fetchCriteres,
    saveCritere,
    deleteCritere,
  };
}
