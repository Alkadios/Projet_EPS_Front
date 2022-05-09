import { User } from '@/models';

export default interface UserState {
  user: User;
  token: string;
}
