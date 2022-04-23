import { Critere } from '@/models';
import CritereState from './stateInterface';

export default {
  setCriteres(state: CritereState, payload: Critere[]) {
    state.criteres = payload;
  },
  setCriteresByApsaRetenu(state: CritereState, payload: Critere[]) {
    state.criteresByApsaRetenu = payload;
  },
  setCriteresByAnneeApsaRetenuAndAfRetenu(state: CritereState, payload: Critere[]) {
    state.criteresByAnneeApsaRetenuAndAfRetenu = payload;
  },
  setCritere(state: CritereState, payload: Critere) {
    state.critere = payload;
  },
};
