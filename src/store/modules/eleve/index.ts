import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { Eleve } from '@/models';
import EleveState from './stateInterface';

export default {
  namespaced: true,
  state(): EleveState {
    return {
      eleves: [] as Eleve[],
    };
  },
  mutations,
  actions,
  getters,
};
