import { getLocalStorage } from '@/store';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import UtilisateurState from './stateInterface';
import { Utilisateur } from '@/models';

export default {
  namespaced: true,
  state(): UtilisateurState {
    return {
      utilisateur: {} as Utilisateur,
      token: '',
    };
  },
  mutations,
  actions,
  getters,
};
