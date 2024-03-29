import axios, { AxiosResponse } from 'axios';
import { apiConfig } from '@/config/UtilisateurConfig';
import { ResponseModel } from '@/models';
import { ApiURLAnnee } from '@/constants/ApiUrls';

export default {
  async fetchAnneeEnCours(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLAnnee}?enCours=true`, apiConfig.value);
  },
  async fetchAnneeById(idAnnee: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLAnnee}/${idAnnee.toString()}`, apiConfig.value);
  },
  async fetchAllAnnees(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLAnnee}`, apiConfig.value);
  },
};
