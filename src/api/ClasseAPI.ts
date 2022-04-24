import axios, { AxiosResponse } from 'axios';
import { ApiURLClasse } from '@/constants/ApiUrls';
import { Etablissement, ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllClasses(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLClasse}`, apiConfig.value);
  },


};
