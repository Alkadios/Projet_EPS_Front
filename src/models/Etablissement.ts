import { NiveauScolaire } from "./NiveauScolaire";

export interface Etablissement {
  '@id': string;
  id:number;
  nom: string;
  adresse: string;
  cp: string;
  ville: string;
  tel : string;
  mail: string;
  nomEtablissement: string;
  niveauxScolaires: NiveauScolaire[];
}
