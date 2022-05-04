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
};
