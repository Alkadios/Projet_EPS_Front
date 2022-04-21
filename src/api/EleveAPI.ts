import axios, { AxiosResponse } from 'axios';
import { ApiURLEleve } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllEleves(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLEleve}`, apiConfig.value);
  },

  async saveEleve(payload: {
    nom: string;
    prenom: string;
    telephone: string;
    mailParent1: string;
    mailParent2: string;
    sexeEleve: string;
    user: string;
  }): Promise<AxiosResponse> {
    return axios.post(`${ApiURLEleve}`, payload, apiConfig.value);
  },
};
