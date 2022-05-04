import { ActionContext } from 'vuex';
import UserState from './stateInterface';
import UserAPI from '@/api/UserAPI';

export default {


  async saveUser(
    context: ActionContext<UserState, any>,
    payload: {
      '@id': string;
      id:number;
      email: string;
      roles: string;
      password: string;

    }
  ) {
    const response = await UserAPI.saveUser(payload);
    if (response.status === 200) {
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },
};
