import ClasseState from './stateInterface';

export default {
  getClasses(state: ClasseState) {
    return state.classes;
  },
  getClassesByAnneeAndProfesseur(state: ClasseState) {
    return state.classesByAnneeAndProfesseur;
  },
};
