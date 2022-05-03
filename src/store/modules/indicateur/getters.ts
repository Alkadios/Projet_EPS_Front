import IndicateurState from './stateInterface';

export default {
  getIndicateurs(state: IndicateurState) {
    return state.indicateurs;
  },
  getIndicateurByCritere(state: IndicateurState) {
    return state.indicateurByCritere;
  },
  getIndicateur(state: IndicateurState) {
    return state.indicateur;
  },
};
