import ProfesseurClassesState from './stateInterface';

export default {
  getProfesseurClasses(state: ProfesseurClassesState) {
    return state.professeurClasses;
  },
  getClassesByProfesseur(state: ProfesseurClassesState) {
    return state.classesByProfesseur;
  },
};
