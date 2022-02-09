import axios, { AxiosResponse } from 'axios';
import { ApiUrl } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchUtilisateur(login: string): Promise<AxiosResponse<ResponseModel>> {
    const parametres = { login: login };

    const url = new URL(`${ApiUrl}/login_check`);
    const urlParams = Object.keys(parametres).length ? new URLSearchParams(parametres).toString() : '';
    url.search = urlParams;
    return axios.get(`${url.toString()}`, apiConfig.value);
  },
};
