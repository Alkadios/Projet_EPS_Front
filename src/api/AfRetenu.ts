import axios, { AxiosResponse } from 'axios';
import { ApiURLAfRetenus } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllAfRetenus(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLAfRetenus}`, apiConfig.value);
  },
};
