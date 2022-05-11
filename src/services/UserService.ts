import { computed } from 'vue';
import { useStore } from 'vuex';
import jwt_decode from 'jwt-decode';
import { Eleve, Professeur, User } from '@/models';

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

  async function checkLocalStorage() {
    await store.dispatch('UserModule/checkLocalStorage', {});
  }

  async function deconnexion() {
    console.log('avant la déco : ', user.value, token.value);
    await store.dispatch('UserModule/deconnexion', {});
    console.log('après la déco : ', user.value, token.value);
  }

  const token = computed((): string => {
    return store.getters['UserModule/getToken'];
  });

  const user = computed((): User => {
    return store.getters['UserModule/getUser'];
  });

  async function storeEleve(eleve: Eleve) {
    await store.dispatch('UserModule/setEleve', { eleve });
  }

  async function storeProfesseur(professeur: Professeur) {
    await store.dispatch('UserModule/setProfesseur', { professeur });
  }

  const eleve = computed((): Eleve => {
    return store.getters['UserModule/getEleve'];
  });

  const professeur = computed((): Professeur => {
    return store.getters['UserModule/getProfesseur'];
  });

  async function login(username: string, password: string) {
    await store.dispatch('UserModule/login', {
      username,
      password,
    });
  }

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
    checkLocalStorage,
    eleve,
    professeur,
  };
}
