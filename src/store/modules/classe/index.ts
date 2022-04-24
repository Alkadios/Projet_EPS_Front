import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { Classe } from '@/models';
import ClasseState from './stateInterface';

export default {
  namespaced: true,
  state(): ClasseState {
    return {
      classes: [] as Classe[],
    };
  },
  mutations,
  actions,
  getters,
};
