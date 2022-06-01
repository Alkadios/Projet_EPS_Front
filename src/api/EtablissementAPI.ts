import axios, { AxiosResponse } from 'axios';
import { ApiURLEtablissement } from '@/constants/ApiUrls';
import { Etablissement, ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllEtablissements(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLEtablissement}`, apiConfig.value);
  },

  async fetchEtablissementById(id: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLEtablissement}/${id}`, apiConfig.value);
  },

  async putEtablissementProfs(
    idEtablissement: number,
    payload: {
      Professeur: string[];
    }
  ): Promise<AxiosResponse> {
    return axios.put(`${ApiURLEtablissement}/` + idEtablissement, payload, apiConfig.value);
  },
  async saveEtablissement(etablissement: Etablissement): Promise<AxiosResponse> {
    if (etablissement.id) {
      return axios.put(`${ApiURLEtablissement}/${etablissement.id}`, etablissement, apiConfig.value);
    } else {
      return axios.post(`${ApiURLEtablissement}`, etablissement, apiConfig.value);
    }
  },
  async deleteEtablissement(idEtablissement: number): Promise<AxiosResponse> {
    return axios.delete(`${ApiURLEtablissement}/${idEtablissement}`, apiConfig.value);
  },
};
