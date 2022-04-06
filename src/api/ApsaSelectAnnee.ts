import axios, { AxiosResponse } from 'axios';
import { ApiURLApsaSelect } from '@/constants/ApiUrls';
import { APSA, ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllApsaSelectAnneeByAnnee(idAnnee: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `Annee.id=${idAnnee.toString()}`;
    const url = new URL(`${ApiURLApsaSelect}/`);
    url.search = new URLSearchParams(paramsString).toString();
    console.log('API', axios.get(`${url.toString()}`, apiConfig.value));
    return axios.get(`${url.toString()}`, apiConfig.value);
  },
  async saveApsaSelectAnnee(payload: {
    Ca: string;
    Apsa: string;
    Annee: string;
  }): Promise<AxiosResponse<ResponseModel>> {
    return axios.post(`${ApiURLApsaSelect}`, payload, apiConfig.value);
  },
};
