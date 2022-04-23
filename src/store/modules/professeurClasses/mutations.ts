import { ProfesseurClasses } from '@/models';
import ProfesseurClassesState from './stateInterface';

export default {
  setProfesseurClasses(state: ProfesseurClassesState, payload: ProfesseurClasses[]) {
    state.professeurClasses = payload;
  },
  setClassesByProfesseur(state: ProfesseurClassesState, payload: ProfesseurClasses[]) {
    state.classesByProfesseur = payload;
  },
};
