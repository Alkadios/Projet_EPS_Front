import axios, { AxiosResponse } from 'axios';
import { ApsaRetenuAPI } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async saveApsaRetenus(payload: {
    AfRetenu: string;
    ApsaSelectAnnee: string;
    SituationEvaluation: string;
  }): Promise<AxiosResponse<ResponseModel>> {
    return axios.post(`${ApsaRetenuAPI}`, payload, apiConfig.value);
  },
};
