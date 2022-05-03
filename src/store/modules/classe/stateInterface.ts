import { Classe } from '@/models';

export default interface ClasseState {
  classes: Classe[];
  classesByAnnee: Classe[];
  classesById: Classe;
}
