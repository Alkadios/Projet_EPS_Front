import axios, { AxiosResponse } from 'axios';
import { ApiURLNiveauScolaire } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllNiveauxScolairesByCycle(idCycle: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `cycle.id=${idCycle.toString()}`;
    const url = new URL(`${ApiURLNiveauScolaire}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },
};
