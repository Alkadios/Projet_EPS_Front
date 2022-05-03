import { Indicateur } from '@/models';

export default interface IndicateurState {
  indicateurs: Indicateur[];
  indicateurByCritere: Indicateur[];
  indicateur: Indicateur;
}
