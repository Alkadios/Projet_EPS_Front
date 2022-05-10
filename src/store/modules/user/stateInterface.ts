import { User, Eleve, Professeur } from '@/models';

export default interface UserState {
  user: User;
  token: string;
  eleve: Eleve;
  professeur: Professeur;
}
