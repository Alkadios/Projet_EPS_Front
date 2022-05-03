import { Eleve, Indicateur } from '@/models';

export interface EvaluationEleve {
  '@id': string;
  '@type': string;
  id: number;
  Eleve: Eleve;
  Evaluation: string;
  Indicateur: Indicateur;
  auto_eval: boolean;
}
