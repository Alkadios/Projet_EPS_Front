<template>
  <header>
    <div>
      <div class="logo">
        <h1>Ticketing</h1>
      </div>
      <button id="reponsive-display-menu" @click="toggleMenu">
        <i
          :class="displayMenu ? 'active' : 'inactive'"
          class="pi pi-ellipsis-v"
          style="font-size: 1.5em"
          aria-hidden="true"
        ></i>
      </button>
      <transition mode="out-in" name="menu">
        <nav v-if="displayMenu">
          <ul id="menu">
            <li>
              <router-link :to="{ name: 'TableauDeBord' }">
                <span>
                  <i class="material-icons" aria-hidden="true">home</i>
                  <span>Accueil</span>
                </span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Search' }">
                <span>
                  <i class="material-icons" aria-hidden="true">search</i>
                  <span>Recherche</span>
                </span>
              </router-link>
            </li>
            <li class="menu-nouveau">
              <a>
                <span>
                  <i class="material-icons" aria-hidden="true">post_add</i>
                  <span>Nouveau</span>
                </span>
              </a>
              <div class="menu-nouveau-sous-menus">
                <router-link :to="{ name: 'CreationDossier' }">
                  <span>
                    <i class="material-icons" aria-hidden="true">source</i>
                    <span>Dossier</span>
                  </span>
                </router-link>
                <router-link :to="{ name: 'CreationIncident' }">
                  <span>
                    <i class="material-icons-round" aria-hidden="true">warning</i>
                    <span>Incident</span>
                  </span>
                </router-link>
                <router-link :to="{ name: 'CreationAction' }">
                  <span>
                    <i class="material-icons" aria-hidden="true">construction</i>
                    <span>Action</span>
                  </span>
                </router-link>
              </div>
            </li>
            <li class="menu-parametrage">
              <a>
                <span>
                  <i class="material-icons" aria-hidden="true">settings</i>
                  <span>Paramétrage</span>
                </span>
              </a>
              <div class="menu-parametrage-sous-menus">
                <router-link :to="{ name: 'ParametrageDomaines' }">
                  <span>
                    <span>Domaines</span>
                  </span>
                </router-link>
                <router-link :to="{ name: 'ParametrageContrats' }">
                  <span>
                    <span>Contrats</span>
                  </span>
                </router-link>
                <router-link :to="{ name: 'ParametrageTechniciens' }">
                  <span>
                    <span>Techniciens</span>
                  </span>
                </router-link>
                <router-link :to="{ name: 'ParametrageClientsContacts' }">
                  <span>
                    <span>Clients et contacts</span>
                  </span>
                </router-link>
                <router-link :to="{ name: 'ParametrageGestionDroits' }">
                  <span>
                    <span>Gestion des droits</span>
                  </span>
                </router-link>
                <router-link :to="{ name: 'ParametrageStatuts' }">
                  <span>
                    <span>Statuts</span>
                  </span>
                </router-link>
              </div>
            </li>
          </ul>
        </nav>
      </transition>
    </div>
    <div>
      <Button
        v-if="!isObjectEmpty(organismeConnecte)"
        class="p-button-info bouton-organisme"
        :disabled="organismesUtilisateur.length <= 1"
        @click="changerOrganisme"
      >
        <span class="material-icons-round icone-material-bouton">account_circle</span>
        <span>
          {{ organismeConnecte.code_organisme }} {{ organismeConnecte.technicien ? '(Technicien)' : '(Client)' }}
        </span>
      </Button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import ObjectUtils from '@/utils/ObjectUtils';
import UtilisateurService from '@/services/UtilisateurService';

const router = useRouter();

const { isObjectEmpty } = ObjectUtils();

const { organismesUtilisateur, organismeConnecte, deconnecterOrganisme } = UtilisateurService();

// Contrôle l'affichage du menu. Par défaut, est vrai si l'écran n'est pas un mobile, faux sinon.
const displayMenu = ref(window.innerWidth >= 600);

onMounted(function () {
  // Evènement utilisé pour contrôler basculer le menu en mode ouvert ou fermé lors du passage de mobile à PC
  window.addEventListener('resize', () => {
    displayMenu.value = window.innerWidth >= 600;
  });
});

function toggleMenu() {
  displayMenu.value = !displayMenu.value;
}

async function changerOrganisme() {
  await deconnecterOrganisme();
  router.replace({ name: 'TableauDeBord', params: { updateSelectionOrganismeComponent: 1 } });
}
</script>

<style lang="scss" scoped>
//@import '@/assets/style/files/header.scss';
</style>
