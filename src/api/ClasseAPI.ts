import axios, { AxiosResponse } from 'axios';
import { ApiClasse } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllClasses(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiClasse}`, apiConfig.value);
  },
  async fetchClasseByAnneeAndProf(idAnnee: number, idProfesseur: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `professeurs.id=${idProfesseur.toString()}&Annee.id=${idAnnee.toString()}`;
    const url = new URL(`${ApiClasse}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },
};
