import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { Eleve, Professeur, User } from '@/models';
import UserState from './stateInterface';

export default {
  namespaced: true,
  state(): UserState {
    return {
      user: {} as User,
      token: '',
      eleve: {} as Eleve,
      professeur: {} as Professeur,
    };
  },
  mutations,
  actions,
  getters,
};
