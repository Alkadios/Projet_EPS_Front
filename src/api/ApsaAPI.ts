import axios, { AxiosResponse } from 'axios';
import { ApiURLAPSA } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllApsa(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLAPSA}`, apiConfig.value);
  },
};