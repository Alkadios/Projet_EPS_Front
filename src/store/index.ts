import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import UtilisateurModule from '@/store/modules/utilisateur/index';


const keyLocalStorage = 'ticketingstore';

export function getLocalStorage(module: string, property: string): any {
  const storage = localStorage.getItem(keyLocalStorage);
  if (storage === null) return null;
  const sto = JSON.parse(storage);
  let mod = sto[module];
  if (mod === undefined) mod = module;
  const prop = mod[property];
  return prop;
}

export default createStore({
  modules: {
    UtilisateurModule,
  },
});
