<template>
  <h3 style="text-align: center" class="text-dark mb-4">Profile {{ NomEleve }}</h3>
  <div class="row mb-3">
    <div class="col-lg-4">
      <div class="card mb-3">
        <div class="card-body text-center shadow">
          <i class="fas fa-user" style="font-size: 7rem"></i>
          <div class="mb-3">
            <button class="btn btn-primary btn-sm" style="display: none" type="button">Change Photo</button>
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
              <p class="text-primary m-0 fw-bold">Informations Professionnelles</p>
            </div>
            <div class="card-body">
              <form>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const categories = ref([
  { name: 'Accounting', key: 'A' },
  { name: 'Marketing', key: 'M' },
  { name: 'Production', key: 'P' },
  { name: 'Research', key: 'R' },
]);

const selectedCategories = ref([]);

const NomEleve = 'Laura GUICHON';

function verif() {
  console.log(selectedCategories.value);
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
