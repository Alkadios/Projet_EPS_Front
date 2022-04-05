import { NiveauScolaire } from '@/models';

export interface Etablissement {
  '@id': string;
  nomEtablissement: string;
  niveauxScolaires: NiveauScolaire[];
}
