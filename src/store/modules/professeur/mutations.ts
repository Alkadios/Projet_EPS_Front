import { Professeur } from '@/models';
import ProfesseurState from './stateInterface';

export default {
  setProfesseurs(state: ProfesseurState, payload: Professeur[]) {
    state.professeurs = payload;
  },
  setProfesseursByEtablissement(state: ProfesseurState, payload: Professeur[]) {
    state.professeursByEtablissement = payload;
  },
};
