import axios, { AxiosResponse } from 'axios';
import { ApiProfesseurClasses } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllProfesseurClasses(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiProfesseurClasses}`, apiConfig.value);
  },

  async fetchClassesByProfesseur(idProfesseur: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `professeur.id=${idProfesseur.toString()}`;
    const url = new URL(`${ApiProfesseurClasses}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },
};
