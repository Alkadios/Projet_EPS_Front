import axios, { AxiosResponse } from 'axios';
import { ApiURLCreateEleve, ApiURLEleve } from '@/constants/ApiUrls';
import { Etablissement, ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchAllEleves(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLEleve}`, apiConfig.value);
  },

  async fetchEleveById(idEleve: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLEleve}/` + idEleve, apiConfig.value);
  },

  async fetchEleveByUser(idUser: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `user.id=${idUser.toString()}`;
    const url = new URL(`${ApiURLEleve}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },

  async fetchElevesByAnneeAndEtablissement(
    idEtablissement: number,
    idAnnee: number
  ): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `etablissement.id=${idEtablissement.toString()}&classe.Annee.id=${idAnnee.toString()}`;
    const url = new URL(`${ApiURLEleve}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },

  async deleteEleve(idEleve: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.delete(`${ApiURLEleve}/` + idEleve, apiConfig.value);
  },

  async saveEleve(payload: {
    email: string;
    roles: string;
    password: string;
    nom: string;
    prenom: string;
    telephone: string;
    mailParent1: string;
    mailParent2: string;
    sexeEleve: string;
    etablissement: Etablissement;
  }): Promise<AxiosResponse> {
    return axios.post(`${ApiURLCreateEleve}`, payload, apiConfig.value);
  },

  async updateEleve(payload: {
    idEleve: number;
    nom: string;
    prenom: string;
    telephone: string;
    mailParent1: string;
    mailParent2: string;
    sexeEleve: string;
  }): Promise<AxiosResponse> {
    const url = `${ApiURLEleve}/${payload.idEleve.toString()}`;
    return axios.put(`${url}`, payload, apiConfig.value);
  },

  async fetchElevesByClasse(idClasse: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `eleveClasses.classe.id=${idClasse.toString()}`;
    const url = new URL(`${ApiURLEleve}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },

  async fetchAllApsaEvaluateByEleve(idEleve: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLEleve}/${idEleve}/apsaRetenu`, apiConfig.value);
  },
};
