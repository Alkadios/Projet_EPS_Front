import { Etablissement, User } from '@/models';
import EtablissementState from './stateInterface';


export default {
  setEtablissements(state: EtablissementState,  payload: Etablissement[]) {
    state.etablissements = payload;
  },
};
