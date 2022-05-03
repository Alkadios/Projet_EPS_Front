import axios, { AxiosResponse } from 'axios';
import { ApiEtablissement } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchEtablissementById(id: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiEtablissement}/${id}`, apiConfig.value);
  },
};
