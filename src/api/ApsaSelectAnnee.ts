import axios, { AxiosResponse } from 'axios';
import { ApiURLApsaSelect } from '@/constants/ApiUrls';
import { APSA, ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllApsaSelectAnnee(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLApsaSelect}`, apiConfig.value);
  },
  async saveApsaSelectAnnee(listeApsa: APSA[]): Promise<AxiosResponse<ResponseModel>> {
    return axios.post(`${ApiURLApsaSelect}`, listeApsa, apiConfig.value);
  },
};
