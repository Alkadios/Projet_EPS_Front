<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-12 col-xl-10">
        <div class="card shadow-lg o-hidden border-0 my-5" style="top: 15%">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-6 d-none d-lg-flex">
                <div
                  class="flex-grow-1 bg-login-image"
                  style="background-image: url('./src/assets/img/Sport_connexion.png')">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-running" style="font-size: 35px;"></i></div>
                    <h4 class="text-dark mb-4">OCPEPS</h4>
                  </div>
                  <div class="user">
                    <div class="mb-3">
                      <input
                        v-model="identifiant"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        name="email"
                      />
                    </div>
                    <div class="mb-3">
                      <input
                        v-model="motDePasse"
                        class="form-control form-control-user"
                        type="password"
                        id="exampleInputPassword"
                        placeholder="Password"
                        name="password"
                      />
                    </div>
                    <div class="mb-3">
                      <div class="custom-control custom-checkbox small">
                      </div>
                    </div>
                    <button class="btn btn-primary d-block btn-user w-100" @click="login()">Login</button>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UtilisateurService from '@/services/UtilisateurService';

const router = useRouter();

const { utilisateur, loginUtilisateur } = UtilisateurService();

const afficherModalErreur = ref(false);
const libelleErreur = ref('');
const identifiant = ref('');
const motDePasse = ref('');

async function validerFormulaire() {
  if (identifiant.value === '' || motDePasse.value === '') {
    libelleErreur.value = 'Identifiant ou mot de passe invalide';
    afficherModalErreur.value = true;
  }
}
async function login() {
  const login = { username: identifiant.value, password: motDePasse.value };
  console.log(login);
  await loginUtilisateur(login);
  if (utilisateur.value.prenom) {
    router.push({ name: 'TableauDeBord' });
  }
}
</script>
