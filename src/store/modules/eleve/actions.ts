import { ActionContext } from 'vuex';
import EleveApi from '@/api/EleveAPI';
import EleveState from './stateInterface';

export default {
  async fetchAllEleves(context: ActionContext<EleveState, any>) {
    const response = await EleveApi.fetchAllEleves();
    if (response.data['hydra:totalItems'] > 0) context.commit('setEleves', response.data['hydra:member']);
    else {
      context.commit('setEleves', []);
      //throw new Error(response.data.message);
    }
  },

  async saveEleve(
    context: ActionContext<EleveState, any>,
    payload: {
      nom: string;
      prenom: string;
      telephone: string;
      mailParent1: string;
      mailParent2: string;
      dateNaiss: Date;
      sexeEleve: string;
      user: string;
      etablissement: string;
    }
  ) {
    const response = await EleveApi.saveEleve(payload);
    if (response.status === 200) {
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },
};
