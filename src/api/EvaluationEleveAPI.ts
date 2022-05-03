import axios, { AxiosResponse } from 'axios';
import { ApiEvaluationEleve } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllEvaluationEleve(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiEvaluationEleve}`, apiConfig.value);
  },
  async fetchEvaluationEleveByAnneeAndEtablissement(
    idAnnee: number,
    idEtablissement: number
  ): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `ApsaSelectAnnee.Annee.id=${idAnnee.toString()}&ApsaSelectAnnee.etablissement.id=${idEtablissement.toString()}`;
    const url = new URL(`${ApiEvaluationEleve}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },

  async saveEvaluationEleve(payload: {
    Date: string;
    evaluationEleve: [
      {
        Indicateur: number;
        Eleve: number;
        autoEval: boolean;
      }
    ];
  }): Promise<AxiosResponse<ResponseModel>> {
    return axios.post(`https://127.0.0.1:8000/api/evaluation_eleve/create`, payload, apiConfig.value);
  },
};
