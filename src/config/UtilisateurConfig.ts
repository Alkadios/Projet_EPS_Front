import { computed } from 'vue';
import store from '@/store';

export const apiConfig = computed((): { headers: { Authorization: string; 'Content-Type'?: string } } => {
  return { headers: { Authorization: `Bearer ${store.getters['UtilisateurModule/getToken']}` } };
});
