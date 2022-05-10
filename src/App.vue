<template>
  <div class="bg-gray-100" :class="{ 'g-sidenav-show': sidenavActive }">
    <div class="min-height-300 bg-primary position-absolute w-100"></div>
    <Sidebar :sidenavActive="sidenavActive" :displaySideBar="displaySidebar" @hideRequest="sidenavActive = false" />
    <main class="main-content position-relative border-radius-lg">
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <div class="card shadow-lg mx-4" style="top: 1rem">
            <div class="card-body p-3">
              <div class="row gx-4">
                <div class="col-auto">
                  <div class="avatar avatar-xl position-relative">
                    <img src="@/assets/img/man.png" alt="profile_image" class="w-100 border-radius-lg shadow-sm" />
                  </div>
                </div>
                <div class="col-auto my-auto">
                  <div class="h-100">
                    <h5 class="mb-1">DELEFORTRIE Lucas</h5>
                    <p class="mb-0 font-weight-bold text-sm">Coordonnateur</p>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                  <div class="nav-wrapper position-relative end-0">
                    <ul class="nav nav-pills nav-fill p-1" role="tablist">
                      <li class="nav-item" id="buttonSideBar" style="margin: auto; display: none">
                        <a
                          class="nav-link mb-0 px-0 py-1 active d-flex align-items-center justify-content-center"
                          data-bs-toggle="tab"
                          href="javascript:;"
                          role="tab"
                          aria-selected="true"
                          @click="reponsiveSideBar()"
                          style="margin: auto"
                        >
                          <i
                            class="fa fa-align-justify"
                            aria-hidden="true"
                            style="
                              font-size: 1.5rem;
                              font-size: 1.5rem;
                              right: 0;
                              position: absolute;
                              padding-right: 2rem;
                            "
                          ></i>
                        </a>
                      </li>
                      <li class="nav-item" id="buttonProfil">
                        <a
                          class="nav-link mb-0 px-0 py-1 active d-flex align-items-center justify-content-center"
                          data-bs-toggle="tab"
                          href="javascript:;"
                          role="tab"
                          aria-selected="true"
                        >
                          <i class="ni ni-app"></i>
                          <span class="ms-2">Mon profil</span>
                        </a>
                      </li>
                      <li class="nav-item" id="buttonLogout">
                        <a
                          class="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center"
                          data-bs-toggle="tab"
                          href="javascript:;"
                          role="tab"
                          aria-selected="false"
                        >
                          <i class="ni ni-settings-gear-65"></i>
                          <span class="ms-2">Déconnexion</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <router-view v-if="onMountedIsFinish" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from './views/Sidebar.vue';
import Navbar from './views/Navbar.vue';
//import UtilisateurService from './services/UtilisateurService';
import Authentification from './views/Authentification.vue';
//import Head from './views/_Head.vue';
import UtilisateurService from './services/UtilisateurService';
import ObjectUtils from './utils/ObjectUtils';

import router from './router';

// const router = useRouter();

const sidenavActive = ref(false);

const { isObjectEmpty } = ObjectUtils();
const { utilisateur, fetchAnneeEnCours, anneeEnCours, storeAnneeEnConfig, fetchEtablissementById } =
  UtilisateurService();
// const { storeOrganismesUtilisateur, organismeConnecte, storeOrganismeConnecte, listeOrganismesUtilisateur } =
//   UtilisateurService();

const onMountedIsFinish = ref(false);
const displaySidebar = ref('block');
console.log(displaySidebar.value, 'displaySidebar2');
onMounted(async () => {
  // if (isObjectEmpty(utilisateur.value)) {
  //   router.push({ name: 'Authentification' });
  // }

  await fetchAnneeEnCours();
  storeAnneeEnConfig(anneeEnCours.value);
  await fetchEtablissementById(1);

  onMountedIsFinish.value = true;
});

var win = navigator.platform.indexOf('Win') > -1;
if (win && document.querySelector('#sidenav-scrollbar')) {
  var options = {
    damping: '0.5',
  };
  Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
}

function reponsiveSideBar() {
  console.log('ta ', displaySidebar.value);
  if (displaySidebar.value === 'none') {
    displaySidebar.value = 'block';
    console.log('oui');
  } else {
    displaySidebar.value = 'none';
    console.log('non');
  }
}
</script>
