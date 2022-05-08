import axios, { AxiosResponse } from 'axios';
import { ApiURLCreateProf, ApiURLProfesseur } from '@/constants/ApiUrls';
import { Etablissement, ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchProfesseursByEtablissement(idEtablissement: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `etablissements=${idEtablissement.toString()}`;
    const url = new URL(`${ApiURLProfesseur}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },

  async saveProf(payload: {
    email: string;
    roles: string;
    password: string;
    nom: string;
    prenom: string;
    telephone: string;
  }): Promise<AxiosResponse> {
    return axios.post(`${ApiURLCreateProf}`, payload, apiConfig.value);
  },
};
