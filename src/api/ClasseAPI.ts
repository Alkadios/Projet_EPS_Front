import axios, { AxiosResponse } from 'axios';
import { ApiClasse } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllClasses(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiClasse}`, apiConfig.value);
  },
};
