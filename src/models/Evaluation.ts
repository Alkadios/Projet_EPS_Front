import { Eleve, Indicateur } from '@/models';

export interface Evaluation {
  '@id': string;
  '@type': string;
  id: number;
  DateEval: Date;
}
