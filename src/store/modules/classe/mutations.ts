import { Classe } from '@/models';
import ClasseState from './stateInterface';

export default {
  setClasses(state: ClasseState, payload: Classe[]) {
    state.classes = payload;
  },
};
