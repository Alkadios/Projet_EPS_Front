import { Eleve } from '@/models';

export default interface EleveState {
  eleves: Eleve[];
  eleveById: Eleve;
  elevesByClasse: Eleve[];
  elevesByAnneeAndEtablissement: Eleve[];
}
