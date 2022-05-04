import EtablissementState from './stateInterface';

export default {
  getEtablissements(state: EtablissementState) {
    return state.etablissements;
  },
};
