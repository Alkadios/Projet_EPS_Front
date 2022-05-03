import { Indicateur } from '@/models';
import IndicateurState from './stateInterface';

export default {
  setIndicateurs(state: IndicateurState, payload: Indicateur[]) {
    state.indicateurs = payload;
  },
  setIndicateursByCritere(state: IndicateurState, payload: Indicateur[]) {
    state.indicateurByCritere = payload;
  },
  setIndicateur(state: IndicateurState, payload: Indicateur) {
    state.indicateur = payload;
  },
};
