import axios, { AxiosResponse } from 'axios';
import { ApiUrlUtilisateur } from '@/constants/ApiUrls';
import { ResponseModel } from '@/models';
import { apiConfig } from '@/config/UtilisateurConfig';

export default {
  // async fetchUtilisateur(login: string): Promise<AxiosResponse<ResponseModel>> {
  //   const parametres = { login: login };

  //   const url = new URL(`${ApiUrlUtilisateur}/search`);
  //   const urlParams = Object.keys(parametres).length ? new URLSearchParams(parametres).toString() : '';
  //   url.search = urlParams;
  //   return axios.get(`${url.toString()}`, apiConfig.value);
  // },
  // async saveFiltre(id_organisme: number, filtre: Filtre): Promise<AxiosResponse<ResponseModel>> {
  //   return axios.post(`${ApiUrlFiltre}/save/${id_organisme}`, filtre, apiConfig.value);
  // },
  // async saveFiltreContact(
  //   id_organisme: number,
  //   id_contact: string,
  //   filtre: FiltreUtilisateur
  // ): Promise<AxiosResponse<ResponseModel>> {
  //   return axios.post(`${ApiUrlFiltreContact}/save/${id_organisme}/${id_contact}`, filtre, apiConfig.value);
  // },
  // async saveFiltreTechnicien(
  //   id_organisme: number,
  //   code_technicien: string,
  //   filtre: FiltreUtilisateur
  // ): Promise<AxiosResponse<ResponseModel>> {
  //   return axios.post(`${ApiUrlFiltreTechnicien}/save/${id_organisme}/${code_technicien}`, filtre, apiConfig.value);
  // },
};
