import axios, { AxiosResponse } from 'axios';
import { ApiURLUser } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async saveUser(payload: { id: number; email: string; roles: string; password: string }): Promise<AxiosResponse> {
    return axios.post(`${ApiURLUser}`, payload, apiConfig.value);
  },
};
