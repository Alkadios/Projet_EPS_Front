import { ActionContext } from 'vuex';
import ApsaRetenuAPI from '@/api/ApsaRetenusAPI';
import ApsaRetenusState from './stateInterface';
import { ApsaRetenus } from '@/models';

export default {
  async saveApsaRetenus(
    context: ActionContext<ApsaRetenusState, any>,
    payload: { AfRetenu: string; SituationEvaluation: string; ApsaSelectAnnee: string }
  ) {
    const response = await ApsaRetenuAPI.saveApsaRetenus(payload);

    //if (response.status !== 201) throw new Error);
  },
};
