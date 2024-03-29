import axios, { AxiosResponse } from 'axios';
import { ApiURLLogin, ApiURLUser } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async saveUser(payload: { id: number; email: string; roles: string; password: string }): Promise<AxiosResponse> {
    return axios.post(`${ApiURLUser}`, payload, apiConfig.value);
  },

  async deleteEleve(idUser: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.delete(`${ApiURLUser}/` + idUser, apiConfig.value);
  },

  async login(payload: { username: string; password: string }): Promise<AxiosResponse> {
    return axios.post(`${ApiURLLogin}`, payload, apiConfig.value);
  },
};
