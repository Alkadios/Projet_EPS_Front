import axios, { AxiosResponse } from 'axios';
import { ApiCritere } from '@/constants/ApiUrls';
import { Critere } from '@/models';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  async fetchCriteres(): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiCritere}`, apiConfig.value);
  },
  async fetchCritereById(idCritere: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiCritere}/${idCritere}`, apiConfig.value);
  },
  async fetchCriteresByApsaRetenu(idApsaRetenu: number): Promise<AxiosResponse<ResponseModel>> {
    return axios.get(`${ApiCritere}?ApsaRetenu.id=${idApsaRetenu}`, apiConfig.value);
  },
  async fetchCriteresByAnneeApsaRetenuAndAfRetenu(
    annee: number,
    idApsaRetenu: number,
    idAfRetenu: number
  ): Promise<AxiosResponse<ResponseModel>> {
    const paramsString = `ApsaRetenu.ApsaSelectAnnee.Apsa.id=${idApsaRetenu.toString()}&ApsaRetenu.ApsaSelectAnnee.Annee.id=${annee.toString()}&ApsaRetenu.AfRetenu.id=${idAfRetenu.toString()}`;
    const url = new URL(`${ApiCritere}/`);
    url.search = new URLSearchParams(paramsString).toString();
    return axios.get(`${url.toString()}`, apiConfig.value);
  },
  async saveCritere(payload: {
    titre: string;
    description: string;
    image: string;
    urlVideo: string;
    ApsaRetenu: string;
  }): Promise<AxiosResponse<any>> {
    return axios.post(`${ApiCritere}`, payload, apiConfig.value);
  },
  async deleteCritere(idCritere: number): Promise<AxiosResponse> {
    return axios.delete(`${ApiCritere}/${idCritere}`, apiConfig.value);
  },
};
