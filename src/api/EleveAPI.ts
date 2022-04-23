import axios, { AxiosResponse } from 'axios';
import { ApiURLCreateEleve } from '@/constants/ApiUrls';
import { Etablissement, ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllEleves(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLCreateEleve}`, apiConfig.value);
  },

  async saveEleve(payload: {
    email: string;
    roles:string;
    password:string;
    nom: string;
    prenom: string;
    telephone: string;
    mailParent1: string;
    mailParent2: string;
    sexeEleve: string;
    etablissement: Etablissement;

  }): Promise<AxiosResponse> {
    return axios.post(`${ApiURLCreateEleve}`, payload, apiConfig.value);
  },
};
