import { EvaluationEleve, Critere } from '@/models';

export interface Indicateur {
  '@id': string;
  id: number;
  libelle: string;
  description: string;
  Critere: Critere;
  image: string;
  url_video: string;
  color: string;
  evaluationEleves: EvaluationEleve[];
}
