import { Critere } from '@/models';

export default interface CritereState {
  criteres: Critere[];
  criteresByApsaRetenu: Critere[];
  critere: Critere;
}
