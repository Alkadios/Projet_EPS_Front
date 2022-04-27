import axios, { AxiosResponse } from 'axios';
import { ApiURLClasse } from '@/constants/ApiUrls';
import { Etablissement, ResponseModel } from '@/models';
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



};
