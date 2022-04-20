import { getLocalStorage } from '@/store';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import UtilisateurState from './stateInterface';
import { Annee, Etablissement, Utilisateur } from '@/models';

export default {
  namespaced: true,
  state(): UtilisateurState {
    return {
      utilisateur: {} as Utilisateur,
      token: '',
      etablissement: { nomEtablissement: 'Lycée Professionnel de St Joseph' } as Etablissement,
      anneeEnConfig: {} as Annee,
      anneeEnCours: {} as Annee,
    };
  },
  mutations,
  actions,
  getters,
};
