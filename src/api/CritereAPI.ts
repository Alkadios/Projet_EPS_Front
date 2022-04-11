import axios, { AxiosResponse } from 'axios';
import { ApiCritere } from '@/constants/ApiUrls';
import { Critere } from '@/models';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchCriteres(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiCritere}`, apiConfig.value);
  },
  async saveCritere(payload: {
    titre: string;
    description: string;
    image: string;
    urlVideo: string;
    ApsaRetenu: string;
  }): Promise<AxiosResponse> {
    return axios.post(`${ApiCritere}`, payload, apiConfig.value);
  },
  async deleteCritere(idCritere: number): Promise<AxiosResponse> {
    return axios.delete(`${ApiCritere}/${idCritere}`, apiConfig.value);
  },
};
