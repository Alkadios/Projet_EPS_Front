import ClasseState from './stateInterface';

export default {
  getClasses(state: ClasseState) {
    return state.classes;
  },

  getClassesByAnnee(state: ClasseState) {
    return state.classesByAnnee;
  },
};
