<template>
  <Toast />
  <div class="bg-gray-100" :class="{ 'g-sidenav-show': sidenavActive }">
    <div class="min-height-300 bg-primary position-absolute w-100"></div>
    <Sidebar
      v-if="!isObjectEmpty(user)"
      :sidenavActive="sidenavActive"
      :displaySideBar="displaySidebar"
      @hideRequest="sidenavActive = false"
    />
    <main class="main-content position-relative border-radius-lg">
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <div v-if="!isObjectEmpty(user)" class="card shadow-lg mx-4" style="top: 1rem">
            <div class="card-body p-3">
              <div class="row gx-4">
                <div class="col-auto">
                  <div class="avatar avatar-xl position-relative" v-if="!isObjectEmpty(professeurByUser)">
                    <img
                      src="@/assets/img/professeur.png"
                      alt="profile_image"
                      class="w-100 border-radius-lg shadow-sm"
                    />
                  </div>
                  <div class="avatar avatar-xl position-relative" v-if="sexeUser === 'M'">
                    <img src="@/assets/img/man.png" alt="profile_image" class="w-100 border-radius-lg shadow-sm" />
                  </div>
                  <div class="avatar avatar-xl position-relative" v-if="sexeUser === 'F'">
                    <img src="@/assets/img/woman.png" alt="profile_image" class="w-100 border-radius-lg shadow-sm" />
                  </div>
                </div>
                <div class="col-auto my-auto">
                  <div class="h-100">
                    <h5 class="mb-1">{{ nomAndPrenom }}</h5>
                    <p class="mb-0 font-weight-bold text-sm">{{ roleUtilisateur }}</p>
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
                      <li class="nav-item" @click="router.push('/Profil')" id="buttonProfil">
                        <router-link
                          to="/Profil"
                          class="nav-link mb-0 px-0 py-1 active d-flex align-items-center justify-content-center"
                          data-bs-toggle="tab"
                          role="tab"
                          aria-selected="true"
                        >
                          <i class="ni ni-app"></i>
                          <span class="ms-2">Mon profil</span>
                        </router-link>
                      </li>
                      <li class="nav-item" @click="logout()" id="buttonLogout">
                        <a
                          href="#"
                          class="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center"
                          data-bs-toggle="tab"
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
          <router-view v-if="onMountedIsFinish && !isObjectEmpty(user) && !afficherSelectionEtablissement" />
          <Authentification v-if="isObjectEmpty(user)" />
          <SelectionEtablissement
            v-if="!isObjectEmpty(user)"
            v-model:afficherSelectionEtablissement="afficherSelectionEtablissement"
          ></SelectionEtablissement>
        </div>
      </div>
    </main>
    <div style="position: fixed; bottom: 0; right: 2rem">
      <ProgressSpinner
        v-if="isLoading"
        style="float: right; width: 50px; height: 50px"
        strokeWidth="8"
        animationDuration=".5s"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';

import Sidebar from './views/Sidebar.vue';
import SelectionEtablissement from '@/views/SelectionEtablissement.vue';
import Authentification from './views/Authentification.vue';
import UtilisateurService from './services/UtilisateurService';
import EleveService from './services/EleveService';
import ProfesseurService from './services/ProfesseurService';
import ObjectUtils from './utils/ObjectUtils';
import UserService from '@/services/UserService';
import Role from '@/constants/Role';

const router = useRouter();
const sidenavActive = ref(false);
const { isObjectEmpty } = ObjectUtils();
const { utilisateur, fetchAnneeEnCours, anneeEnCours, storeAnneeEnConfig, fetchEtablissementById, etablissement } =
  UtilisateurService();

const { fetchEleveByUser, eleveByUser } = EleveService();
const { fetchProfByUser, professeurByUser } = ProfesseurService();
const { token, user, checkLocalStorage, deconnexion } = UserService();
// const { storeOrganismesUtilisateur, organismeConnecte, storeOrganismeConnecte, listeOrganismesUtilisateur } =
//   UtilisateurService();

const onMountedIsFinish = ref(false);
const displaySidebar = ref('block');
const nomAndPrenom = ref();
const sexeUser = ref();
const isLoading = ref(false);
const afficherSelectionEtablissement = ref(false);

const roleUtilisateur = computed(() => {
  if (user.value && user.value.roles) {
    if (user.value.roles.includes(Role.ADMIN)) return 'Coordonateur';
    else if (user.value.roles.includes(Role.PROF)) return 'Professeur';
    else if (user.value.roles.includes(Role.ELEVE)) return 'Eleve';
  }
  return 'Utilisateur';
});

onMounted(async () => {
  // if (isObjectEmpty(utilisateur.value)) {
  //   router.push({ name: 'Authentification' });
  // }
  isLoading.value = true;
  await checkLocalStorage();
  await fetchAnneeEnCours();
  storeAnneeEnConfig(anneeEnCours.value);

  onMountedIsFinish.value = true;
  isLoading.value = false;
});

watch(
  () => user.value,
  async (connectedUser) => {
    if (!isObjectEmpty(connectedUser)) {
      await fetchDonneeUtilisateur();
      if (isObjectEmpty(etablissement.value)) {
        if (user.value.etablissements && user.value.etablissements.length === 1) {
          await fetchEtablissementById(user.value.etablissements[0].id);
        } else afficherSelectionEtablissement.value = true;
      }
    }
  }
);

async function fetchDonneeUtilisateur() {
  if (user.value.roles.includes(Role.PROF)) {
    await fetchProfByUser(user.value.id);
    nomAndPrenom.value = professeurByUser.value.nom + ' ' + professeurByUser.value.prenom;
  } else if (user.value.roles.includes(Role.ELEVE)) {
    await fetchEleveByUser(user.value.id);
    nomAndPrenom.value = eleveByUser.value.nom + ' ' + eleveByUser.value.prenom;
    sexeUser.value = eleveByUser.value.sexeEleve;
  }
}

function reponsiveSideBar() {
  if (displaySidebar.value === 'none') {
    displaySidebar.value = 'block';
  } else {
    displaySidebar.value = 'none';
  }
}

async function logout() {
  await deconnexion();
}
</script>
