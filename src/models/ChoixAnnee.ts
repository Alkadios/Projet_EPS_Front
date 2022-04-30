import { ChampApprentissage, AfRetenus, NiveauScolaire, Annee } from '@/models';
export interface ChoixAnnee {
  '@id': string;
  id: number;
  Annee: string;
  Niveau: string | NiveauScolaire;
  champApprentissage: ChampApprentissage;
  afRetenus: AfRetenus[];
}
