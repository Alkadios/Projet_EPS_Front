import axios, { AxiosResponse } from 'axios';
import { ApiAnnee } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAnneeEnCours(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiAnnee}?en_cours=true`, apiConfig.value);
  },
  async fetchAllAnnee(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiAnnee}`, apiConfig.value);
  },
};
