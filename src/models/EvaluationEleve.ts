import { Eleve, Indicateur, Evaluation } from '@/models';

export interface EvaluationEleve {
  '@id': string;
  '@type': string;
  id: number;
  Eleve: Eleve;
  Evaluation: Evaluation;
  Indicateur: Indicateur;
  auto_eval: boolean;
}
