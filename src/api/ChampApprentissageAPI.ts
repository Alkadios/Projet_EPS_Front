import axios, { AxiosResponse } from 'axios';
import { ApiUrl } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async loginUtilisateur(login: { username: string; password: string }): Promise<AxiosResponse> {
    //const parametres = { username: login.username, passw };

    const url = new URL(`${ApiUrl}/login_check`);
    //const urlParams = Object.keys(parametres).length ? new URLSearchParams(parametres).toString() : '';
    //url.search = urlParams;
    //return axios.get(`${url.toString()}`, apiConfig.value);
    return axios.post(`${url.toString()}`, login, apiConfig.value);
  },
};
