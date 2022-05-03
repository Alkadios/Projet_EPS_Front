import { Classe } from '@/models';
import ClasseState from './stateInterface';

export default {
  setClasses(state: ClasseState, payload: Classe[]) {
    state.classes = payload;
  },
  setClassesByAnnee(state: ClasseState, payload: Classe[]) {
    state.classesByAnnee = payload;
  },
  setClassesById(state: ClasseState, payload: Classe) {
    state.classesById = payload;
  },
};
