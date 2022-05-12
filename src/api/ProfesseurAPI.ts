import axios, { AxiosResponse } from 'axios';
import { ApiURLCreateProf, ApiURLProfesseur } from '@/constants/ApiUrls';
import { Etablissement, ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchProfesseursByEtablissement(idEtablissement: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `etablissements=${idEtablissement.toString()}`;
    const url = new URL(`${ApiURLProfesseur}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },

  async fetchProfByRoles(roles: string): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `user.roles=["${roles}"]`;
    const url = new URL(`${ApiURLProfesseur}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },

  async fetchProfByUser(idUser: number): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `user.id=${idUser.toString()}`;
    const url = new URL(`${ApiURLProfesseur}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },

  async fetchProfById(idProf: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLProfesseur}/` + idProf, apiConfig.value);
  },

  async fetchAllProfs(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiURLProfesseur}`, apiConfig.value);
  },

  async updateProf(
    idProf: number,
    payload: {
      nom: string;
      prenom: string;
      telephone: string;
    }
  ): Promise<AxiosResponse> {
    return axios.put(`${ApiURLProfesseur}/` + idProf, payload, apiConfig.value);
  },

  async saveProf(payload: {
    email: string;
    roles: string;
    password: string;
    nom: string;
    prenom: string;
    telephone: string;
  }): Promise<AxiosResponse> {
    return axios.post(`${ApiURLCreateProf}`, payload, apiConfig.value);
  },

  async putProfesseursClasse(
    idProf: number,
    payload: {
      classe: string[];
    }
  ): Promise<AxiosResponse> {
    return axios.put(`${ApiURLProfesseur}/` + idProf, payload, apiConfig.value);
  },

  async deleteProf(idProf: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.delete(`${ApiURLProfesseur}/` + idProf, apiConfig.value);
  },
};
