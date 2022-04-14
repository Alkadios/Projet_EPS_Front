import axios, { AxiosResponse } from 'axios';
import { ApiURLApsaSelect } from '@/constants/ApiUrls';
import { APSA, ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllApsaSelectAnneeByAnnee(idAnnee: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `Annee.id=${idAnnee.toString()}`;
    const url = new URL(`${ApiURLApsaSelect}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },
  async saveApsaSelectAnnee(
    payload: {
      Ca: number;
      Apsa: number;
      Annee: number;
    }[]
  ): Promise<AxiosResponse> {
    return axios.post(`${ApiURLApsaSelect}/deleteAndReplace`, payload, apiConfig.value);
  },
};
