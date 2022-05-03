import axios, { AxiosResponse } from 'axios';
import { ApsaRetenuAPI } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllApsaRetenu(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApsaRetenuAPI}`, apiConfig.value);
  },
  async fetchApsaRetenu(idApsaRetenu: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApsaRetenuAPI}/${idApsaRetenu}`, apiConfig.value);
  },
  async fetchApsaRetenuByAnneeAndEtablissement(
    idAnnee: number,
    idEtablissement: number
  ): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `ApsaSelectAnnee.Annee.id=${idAnnee.toString()}&ApsaSelectAnnee.etablissement.id=${idEtablissement.toString()}`;
    const url = new URL(`${ApsaRetenuAPI}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },
  async saveApsaRetenu(payload: {
    AfRetenu: string;
    ApsaSelectAnnee: string;
    SituationEvaluation: string;
  }): Promise<AxiosResponse<ResponseModel>> {
    return axios.post(`${ApsaRetenuAPI}`, payload, apiConfig.value);
  },
};
