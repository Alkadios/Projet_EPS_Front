import axios, { AxiosResponse } from 'axios';
import { apiConfig } from '@/config/UtilisateurConfig';
import { ResponseModel } from '@/models';
import { ApiURLAnnee } from '@/constants/ApiUrls';

export default {
  async fetchAllAnnees(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLAnnee}`, apiConfig.value);
  },

 
};
