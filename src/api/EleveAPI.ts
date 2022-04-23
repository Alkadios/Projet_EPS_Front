import axios, { AxiosResponse } from 'axios';
import { ApiEleve } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllEleves(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiEleve}`, apiConfig.value);
  },

  async fetchElevesByClasse(idClasse: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `eleveClasses.classe.id=${idClasse.toString()}`;
    const url = new URL(`${ApiEleve}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },
};
