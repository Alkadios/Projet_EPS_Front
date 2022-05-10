import { computed } from 'vue';
import { useStore } from 'vuex';
import jwt_decode from 'jwt-decode';
import { User } from '@/models';

export default function UserService() {
  const store = useStore();

  async function saveUser(id: number, email: string, roles: string, password: string) {
    await store.dispatch('UserModule/saveUser', {
      id,
      email,
      roles,
      password,
    });
  }

  const token = computed((): string => {
    return store.getters['UserModule/getToken'];
  });

  const user = computed((): string => {
    return store.getters['UserModule/getUser'];
  });

  async function login(username: string, password: string) {
    await store.dispatch('UserModule/login', {
      username,
      password,
    });
  }

  async function deconnexion() {}

  async function deleteUser(idUser: number) {
    await store.dispatch('UserModule/deleteUser', {
      idUser: idUser,
    });
  }

  return {
    saveUser,
    deleteUser,
    login,
    deconnexion,
    token,
    user,
  };
}
