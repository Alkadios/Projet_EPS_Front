import axios, { AxiosResponse } from 'axios';
import { ApiURLAf } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllAfs(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLAf}`, apiConfig.value);
  },
};
