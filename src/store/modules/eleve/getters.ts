import EleveState from './stateInterface';

export default {
  getEleves(state: EleveState) {
    return state.eleves;
  },
  getEleveById(state: EleveState) {
    return state.eleveById;
  },
};
