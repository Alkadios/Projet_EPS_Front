import { ChampApprentissage } from '@/models';
import ChampApprentissageState from './stateInterface';

export default {
  setChampsApprentissages(state: ChampApprentissageState, payload: ChampApprentissage[]) {
    state.champsApprentissages = payload;
  },
};
