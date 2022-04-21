<template>
  <h3 style="text-align: center" class="text-dark mb-4">Profile {{ NomEleve }}</h3>
  <div class="row mb-3">
    <div class="col-lg-4">
      <div class="card mb-3">
        <div class="card-body text-center shadow">
          <img class="rounded-circle mb-3 mt-4" src="@/assets/img/man.png" width="160" height="160" />
          <div class="mb-3">
            <button class="btn btn-primary btn-sm" type="button">Change Photo</button>
          </div>
        </div>
      </div>
      <div class="card shadow mb-4">
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
      </div>
    </div>
    <div class="col-lg-8">
      <div class="row mb-3 d-none">
        <div class="col">
          <div class="card textwhite bg-primary text-white shadow">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col">
                  <p class="m-0">Peformance</p>
                  <p class="m-0"><strong>65.2%</strong></p>
                </div>
                <div class="col-auto"><i class="fas fa-rocket fa-2x"></i></div>
              </div>
              <p class="text-white-50 small m-0"><i class="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card textwhite bg-success text-white shadow">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col">
                  <p class="m-0">Peformance</p>
                  <p class="m-0"><strong>65.2%</strong></p>
                </div>
                <div class="col-auto"><i class="fas fa-rocket fa-2x"></i></div>
              </div>
              <p class="text-white-50 small m-0"><i class="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card shadow mb-3">
            <div class="card-header py-3">
              <p class="text-primary m-0 fw-bold">Creer un Eleve</p>
            </div>
            <div class="card-body">
              <form @submit.prevent="onSubmitEleve">
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Nom</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input class="form-control" v-model="nouveauEleve.nom" type="nom" id="nom" name="nom" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Prenom</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauEleve.prenom"
                        type="prenom"
                        id="prenom"
                        name="prenom"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="telephone"><strong>telephone</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauEleve.telephone"
                        type="telephone"
                        id="telephone"
                        name="telephone"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="mailParent1"><strong>mailParent1</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauEleve.mailParent1"
                        type="mailParent1"
                        id="mailParent1"
                        name="mailParent1"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="mailParent2"><strong>mailParent2</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauEleve.mailParent2"
                        type="mailParent2"
                        id="mailParent2"
                        name="mailParent2"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="mb-3">
                      <label class="form-label" for="sexeEleve"><strong>sexeEleve</strong></label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <input
                        class="form-control"
                        v-model="nouveauEleve.sexeEleve"
                        type="sexeEleve"
                        id="sexeEleve"
                        name="sexeEleve"
                      />
                    </div>
                  </div>
                </div>

                <div class="mb-3" style="text-align: center">
                  <button class="btn btn-primary btn-sm" type="submit">Modifier</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Eleve } from '@/models';
import EleveService from '@/services/EleveService';
import { ref, onMounted } from 'vue';

const categories = ref([
  { name: 'Accounting', key: 'A' },
  { name: 'Marketing', key: 'M' },
  { name: 'Production', key: 'P' },
  { name: 'Research', key: 'R' },
]);

const selectedCategories = ref([]);
const { saveEleve } = EleveService();
const NomEleve = 'Laura GUICHON';
const nouveauEleve = ref<Eleve>({
  id: '',
  nom: '',
  prenom: '',
  telephone: '',
  mailParent1: '',
  mailParent2: '',
  sexeEleve: '',
  user: 'api/users/' + 1,
  etablissement: 'api/etablissements/' + 1,
});

function CreerEleve() {
  saveEleve(
    nouveauEleve.value.nom,
    nouveauEleve.value.prenom,
    nouveauEleve.value.telephone,
    nouveauEleve.value.mailParent1,
    nouveauEleve.value.mailParent2,
    nouveauEleve.value.sexeEleve,
    nouveauEleve.value.user,
    nouveauEleve.value.etablissement
  );
}

function verif() {
  console.log(selectedCategories.value);
}

function onSubmitEleve() {
  CreerEleve();
}
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
