import { computed } from 'vue';
import { useStore } from 'vuex';
import { Utilisateur } from '@/models';

export default function UtilisateurService() {
  const store = useStore();

  const utilisateur = computed((): Utilisateur => {
    return store.getters['UtilisateurModule/getUtilisateur'];
  });
  async function fetchUtilisateur(login: string) {
    await store.dispatch('UtilisateurModule/fetchUtilisateur', { login });
  }

  // const organismesUtilisateur = computed((): Organisme[] => {
  //   return store.getters['UtilisateurModule/getOrganismesUtilisateur'];
  // });
  // async function storeOrganismesUtilisateur(organismesUtilisateur: Organisme[]) {
  //   await store.dispatch('UtilisateurModule/storeOrganismesUtilisateur', { organismesUtilisateur });
  // }

  // const organismeConnecte = computed((): Organisme => {
  //   return store.getters['UtilisateurModule/getOrganismeConnecte'];
  // });
  // async function storeOrganismeConnecte(organismeConnecte: Organisme) {
  //   await store.dispatch('UtilisateurModule/storeOrganismeConnecte', { organismeConnecte });
  // }
  // async function deconnecterOrganisme() {
  //   await store.dispatch('UtilisateurModule/deconnecterOrganisme');
  // }

  // const listeOrganismesUtilisateur = ref<Organisme[]>([
  //   ...utilisateur.value.techniciens.map((t) => {
  //     const organisme = JSON.parse(JSON.stringify(t.organisme));
  //     organisme.technicien = t;
  //     return organisme;
  //   }),
  //   ...utilisateur.value.contacts.map((c) => {
  //     if (c.client) {
  //       const organisme = JSON.parse(JSON.stringify(c.client.organisme));
  //       organisme.contact = c;
  //       return organisme;
  //     }
  //   }),
  // ]);

  // const filtres = computed((): FiltreUtilisateur[] => {
  //   return store.getters['UtilisateurModule/getFiltres'];
  // });
  // async function saveFiltre(id_organisme: number, filtre: Filtre) {
  //   await store.dispatch('UtilisateurModule/saveFiltre', { id_organisme, filtre });
  // }
  // async function saveFiltreContact(id_organisme: number, id_contact: string, filtre_utilisateur: FiltreUtilisateur) {
  //   await store.dispatch('UtilisateurModule/saveFiltreContact', { id_organisme, id_contact, filtre_utilisateur });
  // }
  // async function saveFiltreTechnicien(
  //   id_organisme: number,
  //   code_technicien: string,
  //   filtre_utilisateur: FiltreUtilisateur
  // ) {
  //   await store.dispatch('UtilisateurModule/saveFiltreTechnicien', {
  //     id_organisme,
  //     code_technicien,
  //     filtre_utilisateur,
  //   });
  // }
  // const idFiltreEnregistre = computed(() => {
  //   return store.getters['UtilisateurModule/getIdFiltreEnregistre'];
  // });

  return {
    utilisateur,
    fetchUtilisateur,
    // organismesUtilisateur,
    // storeOrganismesUtilisateur,
    // organismeConnecte,
    // storeOrganismeConnecte,
    // deconnecterOrganisme,
    // listeOrganismesUtilisateur,
    // filtres,
    // saveFiltre,
    // saveFiltreContact,
    // saveFiltreTechnicien,
    // idFiltreEnregistre,
  };
}
