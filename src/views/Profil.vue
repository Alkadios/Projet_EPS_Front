<template>
  <div class="row m-5">
    <div class="col-lg-4">
      <div class="card mb-3">
        <div class="card-body text-center shadow">
          <img
            v-if="!isObjectEmpty(professeurByUser)"
            class="rounded-circle mb-3 mt-4"
            src="@/assets/img/professeur.png"
            width="160"
            height="160"
          />
          <img
            v-if="sexeUser === 'M'"
            class="rounded-circle mb-3 mt-4"
            src="@/assets/img/man.png"
            width="160"
            height="160"
          />
          <img
            v-if="sexeUser === 'F'"
            class="rounded-circle mb-3 mt-4"
            src="@/assets/img/woman.png"
            width="160"
            height="160"
          />
          <div class="mb-3">
            <h5 style="text-align: center" class="text-dark mb-4">{{ nomAndPrenom }}</h5>
          </div>
        </div>
      </div>
      <!-- <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="text-primary fw-bold m-0">Niveau Sports</h6>
        </div>
        <div class="card-body">
          <h4 class="small fw-bold">Server migration<span class="float-end">20%</span></h4>
          <div class="progress progress-sm mb-3">
            <div
              class="progress-bar bg-danger"
              aria-valuenow="20"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 20%"
            >
              <span class="visually-hidden">20%</span>
            </div>
          </div>
          <h4 class="small fw-bold">Sales tracking<span class="float-end">40%</span></h4>
          <div class="progress progress-sm mb-3">
            <div
              class="progress-bar bg-warning"
              aria-valuenow="40"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 40%"
            >
              <span class="visually-hidden">40%</span>
            </div>
          </div>
          <h4 class="small fw-bold">Customer Database<span class="float-end">60%</span></h4>
          <div class="progress progress-sm mb-3">
            <div
              class="progress-bar bg-primary"
              aria-valuenow="60"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 60%"
            >
              <span class="visually-hidden">60%</span>
            </div>
          </div>
          <h4 class="small fw-bold">Payout Details<span class="float-end">80%</span></h4>
          <div class="progress progress-sm mb-3">
            <div
              class="progress-bar bg-info"
              aria-valuenow="80"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 80%"
            >
              <span class="visually-hidden">80%</span>
            </div>
          </div>
          <h4 class="small fw-bold">Account setup<span class="float-end">Complete!</span></h4>
          <div class="progress progress-sm mb-3">
            <div
              class="progress-bar bg-success"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 100%"
            >
              <span class="visually-hidden">100%</span>
            </div>
          </div>
        </div>
      </div>-->
    </div>
    <div class="col-lg-8">
      <div class="row">
        <div class="col">
          <div class="card shadow mb-3">
            <div class="card-header py-3">
              <p class="text-primary m-0 fw-bold">Informations Professionnelles</p>
            </div>
            <div class="card-body">
              <div v-if="!isObjectEmpty(eleveByUser)">
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Date de naissance</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Adresse</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Téléphone</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Email</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Téléphone parental</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Email père</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Email mère</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Association sportive</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Sexe</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
                  </div>
                </div>
                <div class="mb-3" style="text-align: center">
                  <button class="btn btn-primary btn-sm" type="submit">Modifier</button>
                </div>
              </div>
              <div v-if="!isObjectEmpty(professeurByUser)">
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Nom</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Prénom</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Téléphone</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3"><input class="form-control" type="email" id="email" name="email" /></div>
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
import { ref, onMounted } from 'vue';
import EleveService from '@/services/EleveService';
import ProfesseurService from '@/services/ProfesseurService';
import UserService from '@/services/UserService';
import ObjectUtils from '@/utils/ObjectUtils';
import { useRoute, useRouter } from 'vue-router';
import Role from '@/constants/Role';

const { isObjectEmpty } = ObjectUtils();
const { user } = UserService();
const { fetchEleveByUser, eleveByUser } = EleveService();
const { fetchProfByUser, professeurByUser } = ProfesseurService();
const nomAndPrenom = ref();
const sexeUser = ref();
const isLoading = ref(false);
const router = useRouter();
onMounted(async () => {
  if (isObjectEmpty(user.value)) {
    router.push('/');
  } else {
    isLoading.value = true;

    if (!user.value.roles.includes(Role.PROF)) {
      await fetchProfByUser(user.value.id);
      nomAndPrenom.value = professeurByUser.value.nom + ' ' + professeurByUser.value.prenom;
      console.log('professeur By User : ', professeurByUser.value);
    } else if (!user.value.roles.includes(Role.ELEVE)) {
      await fetchEleveByUser(user.value.id);
      nomAndPrenom.value = eleveByUser.value.nom + ' ' + eleveByUser.value.prenom;
      sexeUser.value = eleveByUser.value.sexeEleve;
      console.log('eleveByUser : ', eleveByUser.value);
    }
    isLoading.value = false;
  }
});
</script>
<style>
.mb-3 {
  margin-left: unset;
  margin-right: unset;
  bottom: unset;
  position: relative;
}

label {
  top: 0.3rem;
  position: absolute;
}
</style>
