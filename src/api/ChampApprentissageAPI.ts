import axios, { AxiosResponse } from 'axios';
import { ApiUrl, ApiUrlChampApprentissage } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchChampsApprentissages(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiUrlChampApprentissage}`, apiConfig.value);
  },
};
