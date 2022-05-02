import axios, { AxiosResponse } from 'axios';
import { ApiURLClasse } from '@/constants/ApiUrls';
import { Annee, Eleve, Etablissement, NiveauScolaire, ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllClasses(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLClasse}`, apiConfig.value);
  },

  async fetchClasseByAnnee(idAnnee: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `Annee.id=${idAnnee.toString()}`;
    const url = new URL(`${ApiURLClasse}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },

  async saveClasse(payload: {
    libelleClasse: string;
    NiveauScolaire: string;
    Annee: string;
    etablissement: string;
  }): Promise<AxiosResponse> {
    return axios.post(`${ApiURLClasse}`, payload, apiConfig.value);
  },

  async updateClasse(
    idClasse: number,
    payload: {
      eleves: string[];
    }
  ): Promise<AxiosResponse> {
    return axios.put(`${ApiURLClasse}/` + idClasse, payload, apiConfig.value);
  },
};
