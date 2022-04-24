import axios, { AxiosResponse } from 'axios';
import { ApiIndicateur } from '@/constants/ApiUrls';
import { Critere, Indicateur } from '@/models';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchIndicateurs(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiIndicateur}`, apiConfig.value);
  },
  async fetchIndicateurById(idIndicateur: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiIndicateur}/${idIndicateur}`, apiConfig.value);
  },
  async fetchIndicateursByCritere(idCritere: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiIndicateur}?ApsaRetenu.id=${idCritere}`, apiConfig.value);
  },
  async saveIndicateur(payload: {
    libelle: string;
    description: string;
    image: string;
    urlVideo: string;
    Critere: string;
  }): Promise<AxiosResponse<any>> {
    return axios.post(`${ApiIndicateur}`, payload, apiConfig.value);
  },
  async deleteIndicateur(idCritere: number): Promise<AxiosResponse> {
    return axios.delete(`${ApiIndicateur}/${idCritere}`, apiConfig.value);
  },
};
