<template>
  <body class="bg-gradient-primary">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-9 col-lg-12 col-xl-10">
          <div class="card shadow-lg o-hidden border-0 my-5">
            <div class="card-body p-0">
              <div class="row justify-content-center">
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h4 class="text-dark mb-4">Bien le bonjour !</h4>
                      <i class="fas fa-users" style="font-size: 9em; color: #375cc7; margin-bottom: 4%"></i>
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
                      <div class="mb-3"></div>
                      <button class="btn btn-primary d-block btn-user w-100" type="submit">Login</button>
                      <hr />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UtilisateurService from '@/services/UtilisateurService';

const router = useRouter();

const { fetchUtilisateur } = UtilisateurService();

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
