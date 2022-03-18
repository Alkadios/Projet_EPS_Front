import { NiveauScolaire } from '@/models';

export interface Etablissement {
  nomEtablissement: string;
  niveauxScolaires: NiveauScolaire[];
}
