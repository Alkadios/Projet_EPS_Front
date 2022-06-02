import { Eleve } from '@/models';
import EleveState from './stateInterface';

export default {
  setEleves(state: EleveState, payload: Eleve[]) {
    state.eleves = payload;
  },
  setEleveById(state: EleveState, payload: Eleve) {
    state.eleveById = payload;
  },
  setEleveByUser(state: EleveState, payload: Eleve) {
    state.eleveByUser = payload;
  },
  setElevesByClasse(state: EleveState, payload: Eleve[]) {
    state.elevesByClasse = payload;
  },
  setElevesByAnneeAndEtablissement(state: EleveState, payload: Eleve[]) {
    state.elevesByAnneeAndEtablissement = payload;
  },
  setElevesByEtablissement(state: EleveState, payload: Eleve[]) {
    state.elevesByEtablissement = payload;
  },
  setApsaEvaluateByEleve(state: EleveState, payload: any[]) {
    state.apsaEvaluateByEleve = payload;
  },
};
