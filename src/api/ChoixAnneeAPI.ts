import axios, { AxiosResponse } from 'axios';
import { ApiURLChoixAnnee } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async saveChoixAnnee(payload: { champApprentissage: string; Niveau: string; Annee: string }): Promise<AxiosResponse> {
    return axios.post(`${ApiURLChoixAnnee}`, payload, apiConfig.value);
  },
  async fetchAllChoixAnneeByAnneeAndEtablissement(
    idAnnee: number,
    idEtablissement: number
  ): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `Annee.id=${idAnnee.toString()}&etablissement.id=${idEtablissement.toString()}`;
    const url = new URL(`${ApiURLChoixAnnee}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },
};
