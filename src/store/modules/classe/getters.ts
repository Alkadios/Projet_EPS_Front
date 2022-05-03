import ClasseState from './stateInterface';

export default {
  getClasses(state: ClasseState) {
    return state.classes;
  },

  getClassesByAnnee(state: ClasseState) {
    return state.classesByAnnee;
  },

  getClassesById(state: ClasseState) {
    return state.classesById;
  },
};
