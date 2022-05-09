import ProfesseurState from './stateInterface';

export default {
  getProfesseurs(state: ProfesseurState) {
    return state.professeurs;
  },
  getProfesseursByEtablissement(state: ProfesseurState) {
    return state.professeursByEtablissement;
  },
  getProfById(state: ProfesseurState) {
    return state.professeurById;
  },
};
