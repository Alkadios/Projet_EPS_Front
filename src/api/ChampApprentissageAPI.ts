import axios, { AxiosResponse } from 'axios';
import { ApiUrl, ApiUrlChampApprentissage } from '@/constants/ApiUrls';
import { APSA, ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchChampsApprentissages(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiUrlChampApprentissage}`, apiConfig.value);
  },
  async saveApsaInCa(payload: { idCa: number; apsas: APSA[] }): Promise<AxiosResponse> {
    const dataForPost = payload.apsas.map((apsa) => {
      return { Apsa: apsa.id };
    });
    return axios.post(`${ApiUrlChampApprentissage}/${payload.idCa}/deleteApsaAndReplace`, dataForPost, apiConfig.value);
  },
};
