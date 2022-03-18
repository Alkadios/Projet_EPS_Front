import axios, { AxiosResponse } from 'axios';
import { ApiURLApsaSelect } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllApsaSelectAnnee(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLApsaSelect}`, apiConfig.value);
  },
};
