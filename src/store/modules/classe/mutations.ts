import { Classe } from '@/models';
import ClasseState from './stateInterface';

export default {
  setClasse(state: ClasseState, payload: Classe[]) {
    state.classes = payload;
  },
  setClassesByAnneeAndProfesseur(state: ClasseState, payload: Classe[]) {
    state.classesByAnneeAndProfesseur = payload;
  },
};
