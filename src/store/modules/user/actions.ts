import { ActionContext } from 'vuex';
import UserState from './stateInterface';
import UserAPI from '@/api/UserAPI';
import jwt_decode from 'jwt-decode';

export default {
  async saveUser(
    context: ActionContext<UserState, any>,
    payload: {
      '@id': string;
      id: number;
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

  async login(
    context: ActionContext<UserState, any>,
    payload: {
      username: string;
      password: string;
    }
  ) {
    const response = await UserAPI.login(payload);
    const user = jwt_decode(response.data.token);
    localStorage.setItem('user_access', response.data.token);
    context.commit('setUser', user);
    console.log(user);
    context.commit('setToken', response.data.token);
    console.log('monToken', response.data.token);
    if (response.status === 200) {
    } else {
      //throw new Error(response.data.message);
    }
    //if (response.status !== 201) throw new Error);
  },

  async deconnexion(context: ActionContext<UserState, any>) {
    context.commit('setUser', null);
    context.commit('setToken', '');
    localStorage.removeItem('user_access');
  },

  async checkLocalStorage(context: ActionContext<UserState, any>) {
    if (localStorage.getItem('user_access') != null) {
      const currentToken = jwt_decode(localStorage.getItem('user_access') || '{}');
      console.log('currenttok', currentToken);
      context.commit('setToken', currentToken);
      context.commit('setUser', currentToken);
    }
  },

  async deleteUser(context: ActionContext<UserState, any>, payload: { idUser: number }) {
    const response = await UserAPI.deleteEleve(payload.idUser);
    if (response.status === 204) {
    }
  },
};
