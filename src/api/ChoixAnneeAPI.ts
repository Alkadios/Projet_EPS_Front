import axios, { AxiosResponse } from 'axios';
import { ApiURLChoixAnnee } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async saveChoixAnnee(payload: { champApprentissage: string; Niveau: string; Annee: string }): Promise<AxiosResponse> {
    return axios.post(`${ApiURLChoixAnnee}`, payload, apiConfig.value);
  },
};
