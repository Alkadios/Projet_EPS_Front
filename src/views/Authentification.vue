<template>
  <main class="main-content mt-0">
    <div id="imgLogin" class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Bienvenue !</h1>
            <p class="text-lead text-white">
              Outil d'évaluation pour les professeurs et le suivi des performances des élèves
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="padding-top: 1rem; padding-bottom: 2rem">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Connectez-vous !</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <input
                  class="form-control form-control-user"
                  type="email"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email Address..."
                  name="email"
                  v-model="credentials.username"
                />
              </div>
              <div class="mb-3">
                <input
                  class="form-control form-control-user"
                  type="password"
                  id="exampleInputPassword"
                  placeholder="Password"
                  name="password"
                  v-model="credentials.password"
                />
              </div>
              <div class="text-center">
                <Button class="mt-4" label="connexion" icon="pi pi-check" @click="connexion()" autofocus />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="position: fixed; bottom: 0; right: 2rem">
        <ProgressSpinner
          v-if="isLoading"
          style="float: right; width: 50px; height: 50px"
          strokeWidth="8"
          animationDuration=".5s"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UserService from '@/services/UserService';
import { useRouter } from 'vue-router';
const router = useRouter();
const isLoading = ref(false);
const { user, login, redirectToHomePage } = UserService();

const credentials = ref<any>({
  username: '',
  password: '',
});

async function connexion() {
  isLoading.value = true;
  await login(credentials.value.username, credentials.value.password);
  redirectToHomePage();
  isLoading.value = false;
}
</script>
