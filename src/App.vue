<template>
  <div id="wrapper">
    <Sidebar />
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <Navbar />
        <div class="container-fluid">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "./views/Sidebar.vue";
import Navbar from "./views/Navbar.vue";
//import UtilisateurService from './services/UtilisateurService';
import Authentification from "./views/Authentification.vue";
//import Head from './views/_Head.vue';
import UtilisateurService from "./services/UtilisateurService";
import ObjectUtils from "./utils/ObjectUtils";
import SelectButton from "primevue/selectbutton";

import router from "./router";

// const router = useRouter();

const { isObjectEmpty } = ObjectUtils();
const { utilisateur } = UtilisateurService();
// const { storeOrganismesUtilisateur, organismeConnecte, storeOrganismeConnecte, listeOrganismesUtilisateur } =
//   UtilisateurService();
onMounted(async () => {
  // if (isObjectEmpty(utilisateur.value)) {
  //   router.push({ name: 'Authentification' });
  // }

  var sidebar = document.querySelector('.sidebar');
  var sidebarToggles = document.querySelectorAll('#sidebarToggle, #sidebarToggleTop');

  if (sidebar) {

    var collapseEl = sidebar.querySelector('.collapse');
    var collapseElementList = [].slice.call(document.querySelectorAll('.sidebar .collapse'))
    var sidebarCollapseList = collapseElementList.map(function (collapseEl) {
      return new bootstrap.Collapse(collapseEl, { toggle: false });
    });

    for (var toggle of sidebarToggles) {

      // Toggle the side navigation
      toggle.addEventListener('click', function(e) {
        document.body.classList.toggle('sidebar-toggled');
        sidebar.classList.toggle('toggled');

        if (sidebar.classList.contains('toggled')) {
          for (var bsCollapse of sidebarCollapseList) {
            bsCollapse.hide();
          }
        };
      });
    }

    // Close any open menu accordions when window is resized below 768px
    window.addEventListener('resize', function() {
      var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

      if (vw < 768) {
        for (var bsCollapse of sidebarCollapseList) {
          bsCollapse.hide();
        }
      };
    });
  }

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over

  var fixedNaigation = document.querySelector('body.fixed-nav .sidebar');

  if (fixedNaigation) {
    fixedNaigation.on('mousewheel DOMMouseScroll wheel', function(e) {
      var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

      if (vw > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });
  }

  var scrollToTop = document.querySelector('.scroll-to-top');

  if (scrollToTop) {

    // Scroll to top button appear
    window.addEventListener('scroll', function() {
      var scrollDistance = window.pageYOffset;

      //check if user is scrolling up
      if (scrollDistance > 100) {
        scrollToTop.style.display = 'block';
      } else {
        scrollToTop.style.display = 'none';
      }
    });
  }
});
</script>
