<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-12 col-xl-10">
        <div class="card shadow-lg o-hidden border-0 my-5" style="top: 15%">
          <div class="card-body p-0">
            <div class="row">
              <div class="text-center">
                <div class="p-2">
                  <h2 class="text-dark mb-4">Bienvenue!</h2>
                </div>
              </div>
              <div class="col-lg-6 d-none d-lg-flex">
                <div class="flex-grow-1 bg-login-image">
                  <img
                    src="./../../assets/img/Page_Accueil.png"
                    style="width: 100%; position: relative; top: 15%; left: 10%"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <div class="mb-3"></div>
                  </div>
                  <form class="user">
                    <div class="mb-3">
                      <input
                        class="form-control form-control-user"
                        type="email"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        name="email"
                      />
                    </div>
                    <div class="mb-3">
                      <input
                        class="form-control form-control-user"
                        type="password"
                        id="exampleInputPassword"
                        placeholder="Password"
                        name="password"
                      />
                    </div>
                    <div class="mb-3">
                      <div class="custom-control custom-checkbox small">
                        <div class="form-check">
                          <input class="form-check-input custom-control-input" type="checkbox" id="formCheck-1" /><label
                            class="form-check-label custom-control-label"
                            for="formCheck-1"
                            >Remember Me</label
                          >
                        </div>
                      </div>
                    </div>
                    <button class="btn btn-primary d-block btn-user w-100" type="submit">Login</button>
                    <hr />
                  </form>
                  <div class="text-center"><a class="small" href="forgot-password.html">Forgot Password?</a></div>
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

//const { fetchUtilisateur } = UtilisateurService();

const afficherModalErreur = ref(false);
const libelleErreur = ref('');
const identifiant = ref('');
const motDePasse = ref('');

async function validerFormulaire() {
  if (identifiant.value === '' || motDePasse.value === '') {
    libelleErreur.value = 'Identifiant ou mot de passe invalide';
    afficherModalErreur.value = true;
  }

  // try {
  //   await fetchUtilisateur(identifiant.value);

  //   router.push({ name: 'TableauDeBord' });
  // } catch (e: any) {
  //   if (e.response && e.response.status === 500) {
  //     afficherModalErreur.value = true;
  //   } else {
  //     libelleErreur.value = e.message;
  //     afficherModalErreur.value = true;
  //   }
  // }
}
</script>
