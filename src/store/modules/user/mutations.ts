import { Eleve, Professeur, User } from '@/models';
import UserState from './stateInterface';

export default {
  setUser(state: UserState, user: User) {
    state.user = user;
  },

  setToken(state: UserState, payload: string) {
    state.token = payload;
  },

  setEleve(state: UserState, payload: Eleve) {
    state.eleve = payload;
  },

  setProfesseur(state: UserState, payload: Professeur) {
    state.professeur = payload;
  },
};
